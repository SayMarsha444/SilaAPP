/* ================================
   JAVASCRIPT LANJUTAN — SILA
   DOM, Event Handling, CRUD, localStorage
   ================================ */

// ════════════════════════════════
// DATA LAYER (localStorage)
// localStorage adalah penyimpanan data di browser
// Data tidak hilang meskipun: halaman di-refresh, browser ditutup
// yang bertahan meskipun halaman ditutup/refresh.
// Data disimpan sebagai string JSON.
// Alur: Array → JSON → localStorage
// ════════════════════════════════

// membaca data dari lokal storage
function getdata() {
    const raw = localStorage.getItem('sila_data');
    // jika datanya ada, parse 350% --> array; jika data tidak ada, kembalikan data array yang kosong.
    return raw ? JSON.parse(raw) : [];
}

// 2. menyimpan kembali data ke local storage setelah dibaca (array --> json)
function savedata() {
    localStorage.setItem('sila_data', JSON.stringify(data));
}

// format tanggal (dd-mm-yyyy):
function formattanggal(datastr) {
    const bulan = [
        'januari','februari','maret','april', 'mei','juni','juli','agustus','september','oktober','november', 'desember'
    ];

    const d = new Date(datastr);
    return d.getDate() +' ' + bulan[d.getMonth()] + ' ' + d.getFullYear();
}

// form handling
// menangani form pengajuan; mode tambah dan mode edit berdasarkan parameter url

function initform() {
    const form = document.getElementById('formpengajuan');
    if (!form) return; 
    // jila halaman ga punya form, keluar

    // deteksi mode edit atau tidak?
    // jika parameter url edit ditemukan, maka data lama ditampilkan. jika tidak maka adalah mode tambah (create)

    const editid = urlParams.get('edit');
    let editmode = false;

    if(editid){
        // cari item yang akan diedit berdasarkan ID
        const data = getdata();
        const itemtoedit = data.find(function(item) {
            return item.id == editid;
        });

        // edit.data
        if(itemtoedit) {
            editmode = true; 
            // mode edit aktif
            // mengisi field form dengan data yang ada (pre-fill)

            document.getElementById('nama').value = itemtoedit.nama || '';
            document.getElementById('nim').value = itemtoedit.nim || '';
            const prodiEl = document.getElementById('prodi');
            if (prodiEl && itemtoedit.prodi) prodiEl.value = itemtoedit.prodi || ''
            const layananEl = document.getElementById('layanan');
            if (layananEl && itemtoedit.layanan) layananEl.value = itemtoedit.layanan || ''
            document.getElementById('tanggal').value = itemtoedit.tanggal || '';
            document.getElementById('keterangan').value = itemtoedit.keterangan || '';

            // ubah teks tombol --> "simpan perubahan"
            const btnsubmit = form.querySelector('button[type="submit"]');
            if (btnsubmit) btnsubmit.innerHTML = '✏️simpan perubahan'
        }
    }

    // simpan (submit create)
    // menggunakan event listener untuk submit form (eventnya 'submit')
    // sebelum submit, form akan melakukan validasi
    // saat tombol ajukan di klik; 1. ambil data dari form, 2. validasi data. 3. simpan data. 4.lalu dipindahkan ke halaman riwayat
    //struktur.addeventlistener('event' function())
    form.addEventListener('submit', function(e){
        // cegah form reload
        e.preventDefault();
        // 1. ambil semua nilai di field (cara: panggil get elemen id)
        const nama = document.getElementById('nama').value.trim();
        const nim = document.getElementById('nim').value.trim();
        const prodi = document.getElementById('prodi').value.trim();
        const layanan = document.getElementById('layanan').value.trim();
        const tanggal = document.getElementById('tanggal').value.trim();
        const keterangan = document.getElementById('keterangan').value.trim();
        const errorEl = document.getElementById('formerror').value.trim();

        errorEl.textcontent = ''; 
        // reset pesan error sebelum divalidasi
        
        // validasi form (semua data wajib diisi)
        if (!nama || !nim || !prodi || !layanan || !tanggal) {
            errorEl.textcontent = '❌semua field harus diisi'
            return;
            // hentikan eksekusi jika ga valid
        }

        // nim harus 8 karakter
        if (nim.length !== 8 || isNaN(nim)) {
            errorEl.textcontent = '❌nim harus 8 digit angka!'
            return;
        }

        // --crud-- (create and update)
        const data = getdata();
        if(editmode) {
            for (let i=0; i< data.length; i++){
                // jika ide sama dengan edit id maka mode edit (timpa data)
                if (data[i].id == editid) {
                    data[i].nama == nama;
                    data[i].nim == nim;
                    data[i].prodi == prodi;
                    data[i].layanan == layanan;
                    data[i].tanggal == tanggal;
                    data[i].keterangan == keterangan
                    break;
                }
            }
        }

        else{
            // create: buat data objek yang baru
            const item = {
                id: Date.now(), 
                // timestamp dalam milidetik sebagai ID
                nama: nama,
                nim: nim,
                prodi: prodi,
                layanan: layanan,
                tanggal: tanggal,
                keterangan: keterangan,
            };
            data.push() 
            // tambah data ke array
        }
        savedata(data);
        // simpan ke local storage
        form.reset();
        errorEl.textcontent = '';
        alert(editid ? '💯perubahan berhasil disimpan!' : '💯pengajuan berhasil disimpan!')
        window.location.href = 'riwayat.html' 
        // pindah halaman
    });
    
}

// INIT (initialisasi)
document.addEventListener('DOMContentLoaded', function () {
    initform();
})