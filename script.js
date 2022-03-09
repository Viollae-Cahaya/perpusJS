const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

let nextId = 4;
const books =[
    { id: 1, title: "The First", year: 2002},
    { id: 2, title: "The Second", year: 2003},
    { id: 3, title: "The Third", year: 2004}
];


function tampil() {
    var tabel = document.getElementById("tabel");
    tabel.innerHTML = "<tr><th>No</th><th>data pinjaman buku</th><th>Action</th></tr>";
    for (let i = 0; i < data.length; i++) {
        var btnEdit = "<button class='btn-edit' href='#' onclick='edit(" + i + ")'>Edit</button>";
        var btnHapus = "<button class='btn-hapus' href='#' onclick='hapus(" + i + ")'>Hapus</button>";
        j = i + 1;
        tabel.innerHTML += "<tr><td>" + j + "</td><td>" + data[i] + "</td><td>" + btnEdit + " " + btnHapus + "</tr>";
    }
}

function tambah() {
    var input = document.querySelector("input[name=data_buku]");
    data.push(input.value);
    tampil();
    input.value = "";
}

function edit(id) {
    var baru = prompt("Edit", data[id]);
    data[id] = baru;
    tampil();
}

function hapus(id) {
    data.pop(id);
    tampil();
}

tampil();

//endpoint

app.get("/", (rep,res) => {
    res.send({
        message: "Berhasil melakukan pemanggilan get",
        data: {
            description:
            "Endpoint ini untuk menampilkan data",
        }
    })
})

app.get("/book", (req,res) =>{
    const book = books.find ((item) => item.id == req.params.id);
    res.send({
        message: "Berhasil menampilkan data buku",
        data: { books }
    })
})

app.post("/books", (req,res) => {
    const book = {
        id: nextId++,
        title: req.body.title,
        year: req.body.year,
    }
    books.push(book);
    res.send({
        message: "Berhasil menambahkan buku",
        data: {
            newBook: book,
            totalBooks: books.length,
        }
    })
})

app.put("/books/:id", (req,res) => {
    const bookIndex = books.findIndex((item) => item.id == req.params.id);
    books[bookIndex].title = req.body.title;
    books[bookIndex].year = req.body.year;

    res.send({
        message: "Berhasil mengubah buku",
        data: { book: books[bookIndex]}
    })
})

const port = 8080;
app.listen(port, () => console.log ('App running ${port}'))