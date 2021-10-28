export const compare = (prevProps, nextProps) => JSON.stringify(prevProps) === JSON.stringify(nextProps);
export const monts = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
export const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

export const formatDate = date => {
  let month = date.getMonth(),
    DD = date.getDate(),
    year = date.getFullYear();
  return [`${days[date.getDay()]},`, DD, monts[month], year].join(' ');
}

export const formatTime = date => {
  const time = new Date(date);
  const hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  const min = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  return `${hour} : ${min}`;
}

export const errHandle = err => err.response ? err.response.data.message : err.message;

export const currencyFormat = value => {
  let num = value ? Number(value.toString().replace(/[^\d]/g, '')) : 0;
  let formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });
  return formatter.format(num);
}
