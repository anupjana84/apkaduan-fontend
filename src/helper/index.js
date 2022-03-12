import moment from 'moment';



export const isAutheticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  };
export const isTransition = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("transition")) {
      const jwt=JSON.parse(localStorage.getItem("jwt"));
      const date= JSON.parse(localStorage.getItem('transition'))
      console.log(jwt._id,)
        const day = moment(date.startDate)
        .utcOffset('+05:30')
        .format('DD');
      const month = moment(date.startDate)
        .utcOffset('+05:30')
        .format('MM');
      const x = moment(date.startDate, 'YYYY-MM-DD')
        .subtract(0, 'days')
        .toDate();
      const year = moment(date.startDate)
        .utcOffset('+05:30')
        .format('YYYY');
     
      const todayYear = new Date().getFullYear();
      const todayDate = new Date().getDate();
      const todayMonth = new Date().getMonth() + 1;
      var a = moment([year, month, day]);
      var b = moment([todayYear, todayMonth, todayDate]);
     
      const diffrentDay = Math.abs(a.diff(b, 'days'));
      if(diffrentDay!==null && 0<=diffrentDay && diffrentDay<365 && jwt.user._id==date.userId){
        return true
      }else{
        return false
      }
      
    } else {
      return false;
    }
  };