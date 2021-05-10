// Step 1: run npm install
// Step 2: Copy Paste token
//  Step 3: run npm start

const https = require('https');
const axios = require('axios');
const { exec } = require('child_process');

exec('say Search started');

let attemptCount = 0;

// Login to website and copy-paste token here.
const token = ''

const config = {
    headers: {
        'authority': 'cdn-api.co-vin.in',
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'accept': 'application/json, text/plain, */*',
        'authorization': `Bearer ${token}`,
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36',
        'origin': 'https://selfregistration.cowin.gov.in',
        'sec-fetch-site': 'cross-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://selfregistration.cowin.gov.in/',
        'accept-language': 'en-US,en;q=0.9,mr;q=0.8'
    }
};

const timer = setInterval(checkAvailability, 5000);


function checkAvailability() {

    console.log('Attempt number - ', ++attemptCount);


    axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin?pincode=411028&date=10-05-2021', config)
        .then(response => {
            if (response.data.centers.length) {
                console.log(response.data);        
                exec('say Available center found. You can proceed with booking. Available center found. You can proceed with booking. Available center found. You can proceed with booking. Available center found. You can proceed with booking. Available center found. You can proceed with booking. Available center found. You can proceed with booking. Available center found. You can proceed with booking.');
                clearInterval(timer);
            }
        })
        .catch(error => {
            console.log(error);
            exec('say Attention. Error occurred');
            clearInterval(timer);
        });
}

// Response Sample-
// {
//     centers: [
//       {
//         center_id: 607486,
//         name: 'Covax AnnaSaheb Magar 18 To 44',
//         address: 'MAGARPATTA CHAUKNEAR NOBEL HOSP',
//         state_name: 'Maharashtra',
//         district_name: 'Pune',
//         block_name: 'Haveli',
//         pincode: 411028,
//         lat: 18,
//         long: 73,
//         from: '09:00:00',
//         to: '17:00:00',
//         fee_type: 'Free',
//         sessions: [Array]
//       }
//     ]
//   }