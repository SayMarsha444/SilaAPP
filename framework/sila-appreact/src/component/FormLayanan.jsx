import { useState } from "react";

export default function FormLayanan({
  dataAktif,
  onSimpanData,
  keRiwayat
}) {

  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [prodi, setProdi] = useState("");
  const [layanan, setLayanan] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const tanganiSubmit = (e) => {

    e.preventDefault();

    if (
      !nama ||
      !nim ||
      !prodi ||
      !layanan ||
      !tanggal
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (!/^\d{8}$/.test(nim)) {
      alert("NIM harus terdiri dari 8 digit angka!");
      return;
    }

    const obyekBaru = {
      id: Date.now(),
      nama,
      nim,
      prodi,
      layanan,
      tanggal,
      keterangan
    };
    

    // Gabungkan data lama dengan data baru
    const dataGabungan = [
      ...dataAktif,
      obyekBaru
    ];

    // Kirim ke App.jsx
    onSimpanData(dataGabungan);

    alert("Data berhasil disimpan!");
    console.log("Data yang disimpan:", obyekBaru);

    // Pindah ke halaman Riwayat
    keRiwayat();
  };

  return (
    <form
      className="form-card"
      onSubmit={tanganiSubmit}
    >

      <fieldset>

        <legend>Data Pengajuan</legend>

        <div className="form-group">
          <label>Nama Lengkap</label>

          <input
            type="text"
            value={nama}
            onChange={(e) =>
              setNama(e.target.value)
            }
            placeholder="Masukkan nama lengkap"
          />
        </div>

        <div className="form-row">

          <div className="form-group">
            <label>NIM</label>

            <input
              type="text"
              value={nim}
              maxLength="8"
              onChange={(e) =>
                setNim(e.target.value)
              }
              placeholder="12345678"
            />
          </div>

          <div className="form-group">
            <label>Program Studi</label>

            <select
              value={prodi}
              onChange={(e) =>
                setProdi(e.target.value)
              }
            >
              <option value="">
                Pilih Program Studi
              </option>

              <option>
                Sistem Informasi
              </option>

              <option>
                Teknik Informatika
              </option>

              <option>
                Manajemen
              </option>

              <option>
                Akuntansi
              </option>

            </select>

          </div>

        </div>

        <div className="form-row">

          <div className="form-group">

            <label>Jenis Layanan</label>

            <select
              value={layanan}
              onChange={(e) =>
                setLayanan(e.target.value)
              }
            >
              <option value="">
                Pilih Layanan
              </option>
              <option value="SKA">
                SKA - Surat Aktif Kuliah
              </option>
              <option value="CAK">
                CAK - Cuti Akademik
              </option>
              <option value="TNM">
                TNM - Transkrip Nilai
              </option>

              <option value="PDA">
                PDA - Perubahan Data
              </option>
            </select>
          </div>
          <div className="form-group">

            <label>Tanggal Pengajuan</label>

            <input
              type="date"
              value={tanggal}
              onChange={(e) =>
                setTanggal(e.target.value)
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label>Keterangan</label>
          <textarea
            rows="3"
            value={keterangan}
            onChange={(e) =>
              setKeterangan(e.target.value)
            }
            placeholder="Jelaskan alasan pengajuan..."
          ></textarea>

        </div>
        <div className="form-actions">

          <button
            type="submit"
            className="btn btn-primary"
          >
            🚀 Ajukan Sekarang
          </button>
          <button
            type="reset"
            className="btn btn-outline"
          >
            ↺ Reset
          </button>
        </div>
      </fieldset>
    </form>
  );
}

