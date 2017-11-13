const uInfoKey = 'uInfo'
export default {
  getUInfo: function() {
    var uInfo = localStorage.getItem(uInfoKey);

    if (!uInfo) {
      return false;
    }

    return JSON.parse(uInfo);
  },

  setUInfo: function(info) {
    localStorage.setItem(uInfoKey, JSON.stringify(info));
  }
}