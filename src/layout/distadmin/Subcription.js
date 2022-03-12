import React,{ useState,useEffect } from 'react'

import { Button,Table ,TableBody,TableCell,TableContainer,TableHead,
    TableRow,Paper} from '@mui/material'



import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import moment from 'moment';
import { isAutheticated,isTransition } from '../../helper';
import axios from "axios";
import DistLayout from './DistLayout';
// console.log(response,'response');
// fetch(`/api/subscriptionSave`,{
//   method:"POSt",
//   headers:{
//       'content-type': 'application/json',
//       Authorization:`Bearer ${isAutheticated().token}`

//   },
//   body:JSON.stringify({
//       _id:_id,
//       startDate:toDay,
//       endDate:endDate,
//       price:book.price,
//       role:role,
//       transitionId:response.razorpay_payment_id
//   })
// }).then((res)=>{
// return  res.json()
// })
// .then(result=>{
// localStorage.setItem('transition',JSON.stringify(result.transition))
//   console.log(result);
// }).catch(err=>console.log(err))



const Subcription = () => {
    const {_id,role}=isAutheticated().user
    const toDay=moment().format('YYYY-MM-DD'); 
    const endDate= moment().add(365, 'days').calendar(); 
    const [diffdate,setDiffDate]=useState(null); 
    const save=(response)=>{
     const tra=response.razorpay_payment_id;
        fetch(`/api/subscriptionSave`,{
            method:"POSt",
            headers:{
                'content-type': 'application/json',
                Authorization:`Bearer ${isAutheticated().token}`

            },
            body:JSON.stringify({
                _id:_id,
                startDate:toDay,
                endDate:endDate,
                price:2000,
                role:role ,
                transitionId:tra
            })
        }).then((res)=>{
         return  res.json()
        })
        .then(result=>{
            console.log(result,);
localStorage.setItem('transition',JSON.stringify(result.transition))
checkSubCription()

        }).catch(err=>console.log(err))
    }
    const [book, setBook] = useState({
      name: "The Fault In Our Stars",
      author: "John Green",
      img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
      price: 2,
    });
  
    const initPayment = (data) => {
      const options = {
        key:process.env.REACT_APP_RAZORPAY,
        amount: data.amount,
        currency: data.currency,
        name: book.name,
        description: "Test Transaction",
        image: book.img,
        order_id: data.id,
        handler: async (response) => {
         save(response)
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);
            // console.log(response ,'dddd');
        
        },
        theme: {
          color: "#3399cc",
        },
      };
     
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
    };
  
    const handlePayment = async () => {
   
      try {
        const orderUrl = "/api/orders";
        const { data } = await axios.post(orderUrl, { amount: book.price });
        console.log(data);
        initPayment(data.data);
      } catch (error) {
        console.log(error);
      }
    };
  const checkSubCription=()=>{
    if(isTransition()){
        const date= JSON.parse(localStorage.getItem('transition'))
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
      setDiffDate(diffrentDay);
     // console.log(typeof diffrentDay);
         }

  }
  useEffect(() => {
    checkSubCription()
   
  }, [diffdate])
  
  return (
    <DistLayout>
        {isTransition()?(null):(
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
                Price
                </TableCell>
            <TableCell align="right">Start Date{diffdate}</TableCell>
            <TableCell align="right">Expiry Date</TableCell>
            <TableCell align="right"> Subscription Plan</TableCell>
           
            
           
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow
             
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <CurrencyRupeeIcon/> 2000
              </TableCell>
              <TableCell align="right">{toDay} </TableCell>
              <TableCell align="right">{endDate}</TableCell>
             
             
              <TableCell align="right"> <Button
              onClick={handlePayment}
              variant='contained'>
            Subscrip Now
        </Button>
        </TableCell>
            </TableRow>
        
        </TableBody>
      </Table>
    </TableContainer>
       )}
    </DistLayout>
  )
}

export default Subcription




