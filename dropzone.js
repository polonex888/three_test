const dropZone = document.getElementById('dropzone');
const inputFiles = document.getElementById('file-input');

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.background = 'skyblue';
}, false);

dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropZone.style.background = 'white';
}, false);

inputFiles.addEventListener('change', (e) => {
    files = e.target.files;
    handleFiles(files);
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files)
});

function handleFiles(files){
    let obj = null;
    let mtl = null;
    Array.from(files).forEach(file => {
        if(get_extension(file)=="obj"){
            obj = file;
        }
        if(get_extension(file)=="mtl"){
            mtl = file;
        }
    });
    addObj(obj, mtl)
}

function get_extension(file)
{
  let fileName = file.name;
  // ファイル名の末尾のカンマの位置を取得
  const position = fileName.lastIndexOf('.');
  // indexから一つ目の配列要素を切り取り拡張子を取得
  const extension = fileName.slice(position + 1);

  // チェックの処理に拡張子を渡す
  return extension.toLowerCase();
}
