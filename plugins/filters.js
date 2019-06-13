import Vue from 'vue'

Vue.filter('dateFilter', function dateFilter(utcDateString) {
  let convertedDate = new Date(utcDateString);
  let date = convertedDate.getDate();
  let month = convertedDate.getMonth();
  let year = convertedDate.getFullYear();

  function pad(n) {
    return n<10 ? '0'+n : n;
  };

  return  pad(date) + "/" + pad(month + 1) + "/" + pad(year);
})
