const wrapper = document.querySelector('.wrapper');
const upload_box = document.querySelector('.upload-box');
const file_input = upload_box.querySelector('input');
const ratioInput = document.querySelector('.ratio input');
const downloadbtn = document.querySelector('.download-btn');
const QualityInput = document.querySelector('.quality input');
let previewImg = upload_box.querySelector('img');
let widthInput = document.querySelector('.width input');
let heightInput = document.querySelector('.height input');
let Imageratio;
const loadfile = (e) => {
  previewImg.addEventListener('load', () => {  // once img load then do that
    wrapper.classList.add('active');
    widthInput.value = previewImg.naturalWidth;
    heightInput.value = previewImg.naturalHeight;
    Imageratio = previewImg.naturalWidth / previewImg.naturalHeight;
  });
  let file = e.target.files[0];
  if (!file) return; // if none file selected it return rightaway
  previewImg.src = URL.createObjectURL(file);// create a url of input file
}


widthInput.addEventListener('input', () => {
  // this function auto set the height if aspect ratio checked and width value changes
  let height = ratioInput.checked ? widthInput.value / Imageratio : heightInput.value;
  heightInput.value = Math.round(height);
});

heightInput.addEventListener('input', () => {
  // this function auto set the width if aspect ratio checked and height value changes
  let width = ratioInput.checked ? widthInput.value * Imageratio : widthInput.value;
  widthInput.value = Math.round(width);
});
const downloadAndresize = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');  // it returns the drawing context of picture
  const a = document.createElement('a');

  // get the height & width acc. to input values
  canvas.width = widthInput.value;
  canvas.height = heightInput.value;

  // drawImage takes 4 argument (image, x-coordinate, y-coordinate, width, height)
  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
  // if reduce quality checked then pass 0.7 otherwise 1.0
  // 1.0 means 100% & 0.7 means 70% of total range is(0.1- 1.0) 
  const imageQuality = QualityInput.checked ? 0.7 : 1.0;
  // toDataURL makes url of canvas img takes argument (imagelocation/type, quality no.(e.g 0.7 or 1.0))
  a.href = canvas.toDataURL('image/jpeg', imageQuality);
  const date = new Date();
  let hours = date.getHours();
  let min = date.getMinutes();
  let seconds = date.getSeconds();
  a.download = hours + '-' + min + '-' + seconds; // pass the time as download value
  a.click();  // click so it download the file
}

downloadbtn.addEventListener('click', downloadAndresize);

file_input.addEventListener('change', loadfile);
upload_box.addEventListener('click', () => file_input.click());    // mtlb box pr click krne se input file pr click ho jaaye