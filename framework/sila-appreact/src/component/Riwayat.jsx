export default function Riwayat({
  dataRiwayat,
  simpanData
}) {

  const hapusData = (id) => {

    if (!confirm("Yakin ingin menghapus data ini?")) {
      return;
    }

    const dataBaru = dataRiwayat.filter(
      (item) => item.id !== id
    );

    simpanData(dataBaru);

  };

  const hapusSemua = () => {

    if (!confirm("Yakin ingin menghapus semua data?")) {
      return;
    }

    simpanData([]);

  };

  return (
    <section className="section">
      <div className="container">

        <div className="toolbar">

          <span>
            {dataRiwayat.length} pengajuan
          </span>

          {dataRiwayat.length > 0 && (
            <button
              className="btn btn-outline"
              onClick={hapusSemua}
            >
              🗑 Hapus Semua
            </button>
          )}

        </div>

        {dataRiwayat.length === 0 ? (

          <div className="empty-state">

            <p>
              🗂️ Belum ada pengajuan.
            </p>

          </div>

        ) : (

          <div className="table-responsive">

            <table className="data-table">

              <thead>

                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>NIM</th>
                  <th>Layanan</th>
                  <th>Tanggal</th>
                  <th>Aksi</th>
                </tr>

              </thead>

              <tbody>

                {dataRiwayat.map((item, index) => (

                  <tr key={item.id}>

                    <td>{index + 1}</td>

                    <td>{item.nama}</td>

                    <td>{item.nim}</td>

                    <td>{item.layanan}</td>

                    <td>{item.tanggal}</td>

                    <td>

                      <button
                        className="btn btn-outline"
                        onClick={() =>
                          hapusData(item.id)
                        }
                      >
                        🗑 Hapus
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </section>
  );

}
