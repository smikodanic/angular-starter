class TimeLib {

  /**
   * The pause in miliseconds.
   * @param {number} ms - miliseconds
   */
  async sleep(ms) {
    await new Promise(r => setTimeout(r, ms));
  }


  /**
   * Convert seconds to more human readable string
   * @param  {Number} seconds - number of seconds
   * @return {String}
   */
  secondsToHumanReadable(seconds) {
    const numdays = Math.floor(seconds / 86400);
    const numhours = Math.floor((seconds % 86400) / 3600);
    const numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
    const numseconds = ((seconds % 86400) % 3600) % 60;
    return numdays + ' days ' + numhours + ' hours ' + numminutes + ' minutes ' + numseconds + ' seconds';
  }


  /**
   * Convert seconds to more human readable string
   * @param  {[type]} seconds [description]
   * @return {[type]}         [description]
   */
  secondsToHuman(seconds) {
    let secRest;

    const days = Math.floor(seconds / (24 * 60 * 60));
    secRest = seconds % (24 * 60 * 60);

    const hours = Math.floor(secRest / (60 * 60));
    secRest = secRest % (60 * 60);

    const mins = Math.floor(secRest / 60);
    secRest = secRest % 60;

    const secs = secRest;

    return `${days}d ${hours}h ${mins}m ${secs}s`;
  }



}




module.exports = new TimeLib();
