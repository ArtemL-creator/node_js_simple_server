var querystring = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable");

function start(response) {
	console.log("Request handler 'start' was called.");

	var body =
		'<html>' +
		'<head>' +
		'<meta http-equiv="Content-Type" ' +
		'content="text/html; charset=UTF-8" />' +
		'</head>' +
		'<body>' +
		'<form action="/upload" enctype="multipart/form-data" ' +
		'method="post">' +
		'<input type="file" name="upload" multiple="multiple">' +
		'<input type="submit" value="Загрузить файл" />' +
		'</form>' +
		'</body>' +
		'</html>';

	response.writeHead(200, { "Content-Type": "text/html" });
	response.write(body);
	response.end();
}

var imageType = ".png";
var contentType = "image/png";
const path = require("path")
var d_path = "D:\\USERS\\User\\Desktop\\HTML\\Ex.7-8\\Node\\image";
var m_file = "D:\\USERS\\User\\Desktop\\HTML\\Ex.7-8\\Node\\image\\test.png";

function upload(response, request) {
	console.log("Request handler 'upload' was called.");

	var form = new formidable.IncomingForm();
	console.log("about to parse");

	form.on('error', function (err) {
		console.log("Error");
		throw err;
	})

		.on('fileBegin', function (name, file) {
			file.filepath = m_file;
			console.log("Done");
		});


	form.parse(request, function (error, fields, files) {
		console.log('parsing done');
		response.writeHead(200, { 'Content-Type': 'text/html' });
		response.write("Полученная картинка: " +
			"<ul>" +
			"<li>" + "content type: " + contentType + "</li>" +
			"<li>" + "image type: " + imageType + "</li>" +
			"</ul>"
		);
		response.write('<img src = "/show"/>');
		response.write(
			'<html>' +
			'<head>' +
			'<meta http-equiv="Content-Type" ' +
			'content="text/html; charset=UTF-8" />' +
			'</head>' +
			'<body>' +
			'<form action = "/del" enctype = "multipart/form-data"' + 'method = "post">' +
			'<input type = "submit" value = "Удалить"/>' +
			'</form>' +
			'</body>' +
			'</html>');
		response.end();
	});

}

function show(response) {
	console.log("Request handler 'show' was called.");
	fs.readFile(m_file, "binary", function (error, file) {
		if (error) {
			response.writeHead(500, { "Content-Type": "text/plain" });
			response.write(error + "\n");
			response.end();
		} else {
			// var f = path.resolve(m_file);
			// console.log(f);
			response.writeHead(200, { "Content-Type": contentType });
			response.write(file, "binary");
			response.end();
		}
	});
}

function delete_png(response) {
	console.log("Request handler 'delete_png' was called.");

	fs.unlink(m_file, function () {
		console.log("file deleted");
	});

	response.writeHead(200, { 'Content-Type': 'text/html' });
	response.write(
		'<html>' +
		'<head>' +
		'<meta http-equiv="Content-Type" ' +
		'content="text/html; charset=UTF-8" />' +
		'</head>' +
		'<body>' +
		'<p>Картинка удалена</p>' +
		'<form action="/start" enctype="multipart/form-data" ' + 'method="post">' +
		'<input type="submit" value="Вернуться на главную" />' +
		'</form>' +
		'</body>' +
		'</html>');
	response.end();

}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.del = delete_png;