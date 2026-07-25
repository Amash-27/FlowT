import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { motion } from "framer-motion";

function InvoiceButton({ sale }) {


function generateInvoice(){


const doc = new jsPDF();



/* Header */

doc.setFillColor(15,23,42);

doc.rect(
0,
0,
210,
35,
"F"
);


doc.setTextColor(
255,
255,
255
);


doc.setFontSize(22);

doc.text(
"FlowT Ledger",
20,
20
);


doc.setFontSize(12);

doc.text(
"Sales Invoice",
20,
28
);



/* Reset color */

doc.setTextColor(
0,
0,
0
);




/* Invoice Information */


doc.setFontSize(12);


doc.text(
`Invoice No: ${sale.invoice}`,
20,
55
);


doc.text(
`Date: ${sale.date}`,
20,
63
);





/* Customer */


doc.setFontSize(14);

doc.text(
"Customer Details",
20,
85
);



doc.setFontSize(11);


doc.text(
`Name: ${sale.customer?.name || "-"}`,
20,
95
);


doc.text(
`Phone: ${sale.customer?.phone || "-"}`,
20,
103
);


doc.text(
`Email: ${sale.customer?.email || "-"}`,
20,
111
);





/* Product Table */


autoTable(doc,{

startY:130,


head:[

[
"Product",
"Quantity",
"Amount"
]

],


body:[

[
sale.product,

sale.quantity,

`₹ ${Number(
sale.amount
).toFixed(2)}`

]

],



theme:"grid",



headStyles:{

fillColor:[
79,
70,
229
]

}


});





const finalY =
doc.lastAutoTable.finalY + 20;



doc.setFontSize(14);


doc.text(

`Total Amount: ₹ ${Number(
sale.amount
).toFixed(2)}`,

20,

finalY

);





doc.setFontSize(11);


doc.text(

"Thank you for your business!",

20,

finalY+20

);



doc.save(
`${sale.invoice}.pdf`
);


}





return(

<motion.button


onClick={generateInvoice}


whileHover={{
scale:1.05
}}


whileTap={{
scale:.95
}}


style={{

background:"#4f46e5",

color:"white",

border:"none",

padding:"8px 14px",

borderRadius:"10px",

cursor:"pointer",

fontWeight:"600"

}}


>

🧾 Invoice

</motion.button>

);


}


export default InvoiceButton;