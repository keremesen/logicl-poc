export default function DatePicker() {
  let day = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();
  let hour = new Date().getHours();
  let minute = new Date().getMinutes();
  let second = new Date().getSeconds();

  return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
}
