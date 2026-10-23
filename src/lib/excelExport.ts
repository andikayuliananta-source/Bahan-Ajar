import * as XLSX from "xlsx";
import { Siswa, LogAbsensi, DataNilai, Pengaturan } from "../types";

/**
 * Helper to sanitize filename strings
 */
const sanitizeFileName = (name: string): string => {
  return name.replace(/[^a-zA-Z0-9_\-]/g, "_").replace(/_+/g, "_");
};

/**
 * 1. Export Rekapitulasi Absensi Siswa per Kelas & Mapel (Matrix Format)
 */
export const exportRekapAbsensiExcel = ({
  siswaList,
  absensiList,
  kelas,
  mapel,
  semesterLabel = "Semua Semester",
  config
}: {
  siswaList: Siswa[];
  absensiList: LogAbsensi[];
  kelas: string;
  mapel: string;
  semesterLabel?: string;
  config?: Pengaturan;
}) => {
  const students = siswaList.filter((s) => s.kelas === kelas);
  const sekolah = (config?.Nama_Sekolah || "SEKOLAH").toUpperCase();
  const guru = config?.Nama_Guru || "Guru Mata Pelajaran";

  const rows: (string | number)[][] = [
    [sekolah],
    ["REKAPITULASI PRESENSI & KEHADIRAN SISWA"],
    [`Kelas: ${kelas}`, `Mata Pelajaran: ${mapel}`, `Periode: ${semesterLabel}`],
    [`Guru Pengampu: ${guru}`, `Tanggal Unduh: ${new Date().toLocaleDateString("id-ID")}`],
    [], // empty spacer row
    [
      "No",
      "NISN",
      "Nama Siswa",
      "Kelas",
      "Hadir (H)",
      "Izin (I)",
      "Sakit (S)",
      "Alpa (A)",
      "Total Pertemuan",
      "Persentase Kehadiran (%)",
      "Keterangan"
    ]
  ];

  let sumH = 0;
  let sumI = 0;
  let sumS = 0;
  let sumA = 0;

  students.forEach((s, idx) => {
    const studentRecords = absensiList.filter(
      (a) => a.kelas === kelas && a.mapel === mapel && (a.idSiswa === s.id || a.idSiswa === s.nisn)
    );

    let h = 0, i = 0, sk = 0, a = 0;
    studentRecords.forEach((r) => {
      if (r.status === "Hadir") h++;
      else if (r.status === "Izin") i++;
      else if (r.status === "Sakit") sk++;
      else if (r.status === "Alpa") a++;
    });

    sumH += h;
    sumI += i;
    sumS += sk;
    sumA += a;

    const total = h + i + sk + a;
    const pct = total > 0 ? Math.round((h / total) * 100) : 0;
    const ket = pct >= 85 ? "Sangat Baik" : pct >= 75 ? "Baik" : pct >= 60 ? "Cukup" : total === 0 ? "Belum Ada Data" : "Perlu Perhatian";

    rows.push([
      idx + 1,
      s.nisn || "-",
      s.nama,
      s.kelas,
      h,
      i,
      sk,
      a,
      total,
      `${pct}%`,
      ket
    ]);
  });

  // Total summary row
  rows.push([]);
  rows.push([
    "TOTAL",
    "-",
    `Total Siswa: ${students.length}`,
    kelas,
    sumH,
    sumI,
    sumS,
    sumA,
    sumH + sumI + sumS + sumA,
    "-",
    "-"
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);

  // Set explicit column widths for pleasant reading
  worksheet["!cols"] = [
    { wch: 6 },  // No
    { wch: 16 }, // NISN
    { wch: 28 }, // Nama Siswa
    { wch: 10 }, // Kelas
    { wch: 12 }, // Hadir
    { wch: 10 }, // Izin
    { wch: 10 }, // Sakit
    { wch: 10 }, // Alpa
    { wch: 16 }, // Total Pertemuan
    { wch: 22 }, // Persentase Kehadiran
    { wch: 18 }  // Keterangan
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap_Absensi");

  const fileName = `Rekap_Absensi_${sanitizeFileName(kelas)}_${sanitizeFileName(mapel)}.xlsx`;
  XLSX.writeFile(workbook, fileName);
  return fileName;
};

/**
 * 2. Export Riwayat Log Absensi Harian Siswa
 */
export const exportRiwayatAbsensiExcel = ({
  absensiList,
  filterKelas,
  filterMapel,
  filterTanggal,
  config
}: {
  absensiList: LogAbsensi[];
  filterKelas?: string;
  filterMapel?: string;
  filterTanggal?: string;
  config?: Pengaturan;
}) => {
  const sekolah = (config?.Nama_Sekolah || "SEKOLAH").toUpperCase();
  const rows: (string | number)[][] = [
    [sekolah],
    ["RIWAYAT DETAIL ABSENSI & PRESENSI SISWA"],
    [
      `Filter Kelas: ${filterKelas || "Semua Kelas"}`,
      `Filter Mapel: ${filterMapel || "Semua Mapel"}`,
      `Filter Tanggal: ${filterTanggal || "Semua Tanggal"}`
    ],
    [`Tanggal Unduh: ${new Date().toLocaleDateString("id-ID")}`, `Total Data: ${absensiList.length}`],
    [],
    [
      "No",
      "Tanggal",
      "Kelas",
      "Mata Pelajaran",
      "ID / NISN Siswa",
      "Nama Lengkap Siswa",
      "Status Kehadiran",
      "Guru Pengampu"
    ]
  ];

  absensiList.forEach((item, idx) => {
    rows.push([
      idx + 1,
      item.tanggal || item.waktu || "-",
      item.kelas || "-",
      item.mapel || "-",
      item.idSiswa || "-",
      item.namaSiswa || "-",
      item.status || "Hadir",
      item.namaGuru || config?.Nama_Guru || "-"
    ]);
  });

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 6 },  // No
    { wch: 14 }, // Tanggal
    { wch: 10 }, // Kelas
    { wch: 22 }, // Mapel
    { wch: 16 }, // ID/NISN
    { wch: 28 }, // Nama
    { wch: 16 }, // Status
    { wch: 24 }  // Guru
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Riwayat_Absensi");

  const fileName = `Riwayat_Absensi_${sanitizeFileName(filterKelas || "Semua")}_${sanitizeFileName(filterTanggal || "Semua")}.xlsx`;
  XLSX.writeFile(workbook, fileName);
  return fileName;
};

/**
 * 3. Export Leger Nilai Akademik Siswa per Kelas & Mapel (Matrix Format)
 */
export const exportLegerNilaiExcel = ({
  siswaList,
  nilaiList,
  kelas,
  mapel,
  semesterLabel = "Semua Semester",
  config
}: {
  siswaList: Siswa[];
  nilaiList: DataNilai[];
  kelas: string;
  mapel: string;
  semesterLabel?: string;
  config?: Pengaturan;
}) => {
  const students = siswaList.filter((s) => s.kelas === kelas);
  const rawGrades = nilaiList.filter((n) => n.kelas === kelas && n.mapel === mapel);
  const testTypes = Array.from(new Set(rawGrades.map((g) => g.jenis).filter(Boolean))).sort();

  const sekolah = (config?.Nama_Sekolah || "SEKOLAH").toUpperCase();
  const guru = config?.Nama_Guru || "Guru Mata Pelajaran";

  const headerCols: (string | number)[] = [
    "No",
    "NISN",
    "Nama Siswa",
    "Kelas",
    ...testTypes,
    "Total Nilai",
    "Rata-Rata",
    "Predikat",
    "Keterangan"
  ];

  const rows: (string | number)[][] = [
    [sekolah],
    ["LEGER NILAI AKADEMIK PESERTA DIDIK"],
    [`Kelas: ${kelas}`, `Mata Pelajaran: ${mapel}`, `Periode: ${semesterLabel}`],
    [`Guru Pengampu: ${guru}`, `Tanggal Unduh: ${new Date().toLocaleDateString("id-ID")}`],
    [],
    headerCols
  ];

  const colAverages: Record<string, { sum: number; count: number }> = {};
  testTypes.forEach((t) => {
    colAverages[t] = { sum: 0, count: 0 };
  });

  students.forEach((s, idx) => {
    const studentGrades = rawGrades.filter((g) => g.idSiswa === s.id || g.idSiswa === s.nisn);
    let sum = 0;
    let count = 0;

    const gradeVals = testTypes.map((t) => {
      const found = studentGrades.find((g) => g.jenis === t);
      if (found && typeof found.nilai === "number") {
        sum += found.nilai;
        count++;
        colAverages[t].sum += found.nilai;
        colAverages[t].count += 1;
        return found.nilai;
      }
      return "-";
    });

    const avg = count > 0 ? Math.round((sum / count) * 10) / 10 : 0;
    const predikat = avg >= 90 ? "A (Sangat Baik)" : avg >= 80 ? "B (Baik)" : avg >= 70 ? "C (Cukup)" : avg > 0 ? "D (Kurang)" : "-";
    const status = avg >= 75 ? "Tuntas" : avg > 0 ? "Remedial" : "Belum Ada Nilai";

    rows.push([
      idx + 1,
      s.nisn || "-",
      s.nama,
      s.kelas,
      ...gradeVals,
      sum,
      avg,
      predikat,
      status
    ]);
  });

  // Summary Row: Rata-rata Kelas
  rows.push([]);
  const summaryRow: (string | number)[] = [
    "RATA-RATA KELAS",
    "-",
    `Total Siswa: ${students.length}`,
    kelas
  ];
  let totalAllSum = 0;
  let totalAllCount = 0;
  testTypes.forEach((t) => {
    const { sum, count } = colAverages[t];
    if (count > 0) {
      const r = Math.round((sum / count) * 10) / 10;
      summaryRow.push(r);
      totalAllSum += sum;
      totalAllCount += count;
    } else {
      summaryRow.push("-");
    }
  });
  summaryRow.push(totalAllSum);
  summaryRow.push(totalAllCount > 0 ? Math.round((totalAllSum / totalAllCount) * 10) / 10 : 0);
  summaryRow.push("-");
  summaryRow.push("-");
  rows.push(summaryRow);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);

  // Column widths
  const colWidths = [
    { wch: 6 },  // No
    { wch: 16 }, // NISN
    { wch: 28 }, // Nama
    { wch: 10 }  // Kelas
  ];
  testTypes.forEach(() => colWidths.push({ wch: 14 }));
  colWidths.push({ wch: 14 }); // Total
  colWidths.push({ wch: 14 }); // Rata-rata
  colWidths.push({ wch: 16 }); // Predikat
  colWidths.push({ wch: 16 }); // Keterangan

  worksheet["!cols"] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Leger_Nilai");

  const fileName = `Leger_Nilai_${sanitizeFileName(kelas)}_${sanitizeFileName(mapel)}.xlsx`;
  XLSX.writeFile(workbook, fileName);
  return fileName;
};

/**
 * 4. Export Riwayat Log Input Nilai Siswa
 */
export const exportRiwayatNilaiExcel = ({
  nilaiList,
  siswaList,
  filterKelas,
  filterMapel,
  filterJenis,
  config
}: {
  nilaiList: DataNilai[];
  siswaList?: Siswa[];
  filterKelas?: string;
  filterMapel?: string;
  filterJenis?: string;
  config?: Pengaturan;
}) => {
  const sekolah = (config?.Nama_Sekolah || "SEKOLAH").toUpperCase();
  const rows: (string | number)[][] = [
    [sekolah],
    ["RIWAYAT INPUT NILAI AKADEMIK SISWA"],
    [
      `Filter Kelas: ${filterKelas || "Semua Kelas"}`,
      `Filter Mapel: ${filterMapel || "Semua Mapel"}`,
      `Filter Jenis: ${filterJenis || "Semua Evaluasi"}`
    ],
    [`Tanggal Unduh: ${new Date().toLocaleDateString("id-ID")}`, `Total Data: ${nilaiList.length}`],
    [],
    [
      "No",
      "Tanggal / Waktu",
      "Kelas",
      "Mata Pelajaran",
      "Jenis Penilaian",
      "NISN / ID Siswa",
      "Nama Siswa",
      "Nilai",
      "Predikat",
      "Guru Pengampu"
    ]
  ];

  nilaiList.forEach((item, idx) => {
    const student = siswaList?.find((s) => s.id === item.idSiswa || s.nisn === item.idSiswa);
    const nama = student ? student.nama : item.namaSiswa || "-";
    const nilaiNum = typeof item.nilai === "number" ? item.nilai : Number(item.nilai);
    const predikat = !isNaN(nilaiNum) && item.nilai !== ""
      ? (nilaiNum >= 90 ? "A" : nilaiNum >= 80 ? "B" : nilaiNum >= 70 ? "C" : "D")
      : "-";

    rows.push([
      idx + 1,
      item.waktu || "-",
      item.kelas || "-",
      item.mapel || "-",
      item.jenis || "-",
      item.idSiswa || "-",
      nama,
      item.nilai !== undefined && item.nilai !== "" ? item.nilai : "-",
      predikat,
      item.namaGuru || config?.Nama_Guru || "-"
    ]);
  });

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 6 },  // No
    { wch: 14 }, // Tanggal
    { wch: 10 }, // Kelas
    { wch: 22 }, // Mapel
    { wch: 16 }, // Jenis
    { wch: 16 }, // ID/NISN
    { wch: 28 }, // Nama
    { wch: 10 }, // Nilai
    { wch: 12 }, // Predikat
    { wch: 24 }  // Guru
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Riwayat_Nilai");

  const fileName = `Riwayat_Nilai_${sanitizeFileName(filterKelas || "Semua")}_${sanitizeFileName(filterMapel || "Semua")}.xlsx`;
  XLSX.writeFile(workbook, fileName);
  return fileName;
};

/**
 * 5. Export Sesi Absensi Harian (Dari Layar Input Absensi)
 */
export const exportSesiAbsensiExcel = ({
  tanggal,
  kelas,
  mapel,
  siswaList,
  attendanceState,
  config
}: {
  tanggal: string;
  kelas: string;
  mapel: string;
  siswaList: Siswa[];
  attendanceState: Record<string, string>;
  config?: Pengaturan;
}) => {
  const sekolah = (config?.Nama_Sekolah || "SEKOLAH").toUpperCase();
  const students = siswaList.filter((s) => s.kelas === kelas);

  const rows: (string | number)[][] = [
    [sekolah],
    ["PRESENSI HARIAN SISWA"],
    [`Tanggal: ${tanggal}`, `Kelas: ${kelas}`, `Mata Pelajaran: ${mapel}`],
    [`Guru: ${config?.Nama_Guru || "-"}`, `Waktu Unduh: ${new Date().toLocaleTimeString("id-ID")}`],
    [],
    ["No", "NISN", "Nama Lengkap Siswa", "Kelas", "Mata Pelajaran", "Tanggal", "Status Presensi"]
  ];

  students.forEach((s, idx) => {
    const status = attendanceState[s.id] || "Hadir";
    rows.push([
      idx + 1,
      s.nisn || "-",
      s.nama,
      s.kelas,
      mapel,
      tanggal,
      status
    ]);
  });

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 16 },
    { wch: 28 },
    { wch: 10 },
    { wch: 22 },
    { wch: 14 },
    { wch: 16 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Absensi_Harian");

  const fileName = `Absensi_${sanitizeFileName(kelas)}_${sanitizeFileName(mapel)}_${tanggal}.xlsx`;
  XLSX.writeFile(workbook, fileName);
  return fileName;
};

/**
 * 6. Export Sesi Penilaian (Dari Layar Input Penilaian)
 */
export const exportSesiPenilaianExcel = ({
  kelas,
  mapel,
  jenisPenilaian,
  studentsInClass,
  gradesMap,
  config
}: {
  kelas: string;
  mapel: string;
  jenisPenilaian: string;
  studentsInClass: Siswa[];
  gradesMap: Record<string, number | "">;
  config?: Pengaturan;
}) => {
  const sekolah = (config?.Nama_Sekolah || "SEKOLAH").toUpperCase();
  const rows: (string | number)[][] = [
    [sekolah],
    ["DAFTAR NILAI EVALUASI PEMBELAJARAN"],
    [`Kelas: ${kelas}`, `Mata Pelajaran: ${mapel}`, `Jenis Penilaian: ${jenisPenilaian}`],
    [`Guru: ${config?.Nama_Guru || "-"}`, `Tanggal: ${new Date().toLocaleDateString("id-ID")}`],
    [],
    ["No", "NISN", "Nama Lengkap Siswa", "Kelas", "Jenis Evaluasi", "Nilai (0-100)", "Predikat", "Keterangan"]
  ];

  let sum = 0;
  let count = 0;

  studentsInClass.forEach((s, idx) => {
    const val = gradesMap[s.id];
    const isNum = typeof val === "number" && !isNaN(val);
    if (isNum) {
      sum += val;
      count++;
    }

    const predikat = isNum ? (val >= 90 ? "A" : val >= 80 ? "B" : val >= 70 ? "C" : "D") : "-";
    const ket = isNum ? (val >= 75 ? "Tuntas" : "Remedial") : "Belum Dinilai";

    rows.push([
      idx + 1,
      s.nisn || "-",
      s.nama,
      s.kelas,
      jenisPenilaian,
      val !== undefined && val !== "" ? val : "-",
      predikat,
      ket
    ]);
  });

  // Summary Row
  rows.push([]);
  rows.push([
    "RATA-RATA",
    "-",
    `Total Siswa: ${studentsInClass.length}`,
    kelas,
    jenisPenilaian,
    count > 0 ? Math.round((sum / count) * 10) / 10 : 0,
    "-",
    "-"
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 16 },
    { wch: 28 },
    { wch: 10 },
    { wch: 16 },
    { wch: 14 },
    { wch: 12 },
    { wch: 16 }
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Nilai_Siswa");

  const fileName = `Nilai_${sanitizeFileName(kelas)}_${sanitizeFileName(mapel)}_${sanitizeFileName(jenisPenilaian)}.xlsx`;
  XLSX.writeFile(workbook, fileName);
  return fileName;
};
