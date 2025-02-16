import TimeToLeaveSharpIcon from '@mui/icons-material/TimeToLeaveSharp';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import URideGo from "../public/ride/URideGo.png";
import URideX  from "..//public/ride/URideX.png";
import URideSharePool_v1  from "..//public/ride/URideSharePool_v1.png"
import URideComfort_Premium from "../public/ride/URideComfort_Premium.png"

 export const HeaderMenu = [
    {
        id: 1,
        name: 'Ride',
        icon: <TimeToLeaveSharpIcon />
    },
    {
        id: 2,
        name: 'Package',
        icon: <Inventory2RoundedIcon />
    },
];

export const RideBaseFare = [
    {
        name: 'URideGo',
        baseFare: 500,
    },
    {
        name: 'URideX',
        baseFare: 700,
    },
    {
        name: 'URideShare',
        baseFare: 400,
    },
    {
        name: 'URideComfort_Premium',
        baseFare: 1500,
    }
];



 export const RideDetailsOptions = [
    {
        image: URideGo,
        title: "URide Go",
        icon: "mdi:person",
        numberOfPersons: 5,
        time: "8 mins away•6:24 AM",
        text: "Faster",
        baseFare: 500,
        classname: "bg-blue-600 mr-2 text-white flex justify-center items-center rounded-lg",
    },
    {
        image: URideX,
        title: "URideX",
        icon: "mdi:person",
        numberOfPersons: 3,
        time: "8 mins away•6:24 AM",
        text: "Affordable rides, all to yourself",
        baseFare: 700,
        classname: "",
    },
    {
        image: URideSharePool_v1,
        title: "URide share",
        icon: "mdi:person",
        numberOfPersons: 4,
        time: "4 mins away•12:04 AM",
        text: "Save by sharing",
        baseFare: 400,
        classname: "bg-blue-600 mr-2 text-white flex justify-center items-center rounded-lg",
    },
    {
        image: URideComfort_Premium,
        title: "Comfort",
        icon: "mdi:person",
        numberOfPersons: 1,
        time: "8 mins away•6:24 AM",
        text: "Comfortable cars with top-quality drivers",
        baseFare: 1500,
        classname: "",
    },
];

 export const FareCharges = [
    {
        pricePerKilometer : 176.27,
         pricePerMinute: 84.21,
    }

    ]
