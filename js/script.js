// minggu 12
// var, fungsi, validasi sederhana

// variabel const (layanan.html)
const layanan = ['SKA', 'CAK', 'PDA', 'TNM']

// tanggal (fungsi format)
// dd-mm-yyyy 
// gunakan objek bawaan dari js

function formattanggal (dateStr) {
    // formating
    const bulan = ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'aug', 'sept', 'okt', 'nov', 'des']
    const d = new Date(dateStr); 
    // deklarasi new date

    // format (tgl, bln, thn)
    return d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear()
}

// validasi form
function validasiform() {
    // 1. get value
    const namalengkap = document.getElementById('namalengkap').value;
    const nim = document.getElementById('nim').value;
    const prodi = document.getElementById('prodi').value;
    const layanan = document.getElementById('layanan').value;
    const tanggal = document.getElementById('tanggal').value;
    const keterangan = document.getElementById('keterangan').value;
    

    // alert(namalengkap)
    // alert(nim)
    // alert(prodi)
    // alert(layanan)
    // alert(tanggal)
    // alert(keterangan)

    // console.log(namalengkap)

    // 2. validasi, cek field yang kosong
    if(namalengkap === '' || nim === '' || prodi === '' || layanan === '' || tanggal === '' || keterangan === '') {
        alert('❌isi semuanya, wajib ma preen!!');

        // mencegah submit halaman (padahal isinya kosong jieers)
        return false;
    }

    // batasi jumlah harus 8 karakter (nim)
    if(nim.length !== 8 || isNaN(nim)) {
        alert('❌harus 8 karakter preeen, gaboleh 2, 1, 5, 0');
        return false;
    }

    // tampilkan hasil jika berhasil validasi
    // di console
    console.log("Data pengajuan berhasil: ",{
        namalengkap: namalengkap,
        nim: nim,
        prodi: prodi,
        layanan: layanan,
        tanggal: formattanggal(tanggal),
        keterangan: keterangan
    });

    // di alert
    alert("data pengajuan berhasil: " +
        'nama lengkap' + namalengkap + '\n' +
        'nim' + nim, + '\n' +
        'prodi' + prodi, + '\n' +
        'layanan' + layanan + '\n' +
        'tanggal' + formattanggal(tanggal), + '\n' +
        'keterangan' + keterangan
    );

    return false;


}