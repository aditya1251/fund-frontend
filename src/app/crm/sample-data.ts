interface Lead {
	fileNo: string;
	loan: string;
	mode: string;
	applicant: string;
	subscriber: string;
	email: string;
	phone: string;
	review: string;
	status: "Approved" | "Rejected" | "Pending";
}

const leads: Lead[] = [
	{
		fileNo: "8067",
		loan: "Personal Loan RS 10,000",
		mode: "Lorem",
		applicant: "Akash Sharma",
		subscriber: "Client",
		email: "Lorem99@gmail.com",
		phone: "8965412375",
		review: "Lorem is amet so",
		status: "Rejected",
	},
	{
		fileNo: "1244",
		loan: "Personal Loan RS 6,000",
		mode: "Lorem",
		applicant: "Lokesh Roy",
		subscriber: "Client",
		email: "Lorem99@gmail.com",
		phone: "8965412375",
		review: "Lorem is amet so",
		status: "Pending",
	},
	{
		fileNo: "4123",
		loan: "Personal Loan RS 160,000",
		mode: "Lorem",
		applicant: "Anuv Gupta",
		subscriber: "Client",
		email: "Lorem99@gmail.com",
		phone: "8965412375",
		review: "Lorem is amet so",
		status: "Approved",
	},
	{
		fileNo: "7854",
		loan: "Personal Loan RS 23,000",
		mode: "Lorem",
		applicant: "Sam Curran",
		subscriber: "Client",
		email: "Lorem99@gmail.com",
		phone: "8965412375",
		review: "Lorem is amet so",
		status: "Approved",
	},
	{
		fileNo: "4175",
		loan: "Personal Loan RS 11,000",
		mode: "Lorem",
		applicant: "Unkown",
		subscriber: "Client",
		email: "Lorem99@gmail.com",
		phone: "8965412375",
		review: "Ipsum Lorem",
		status: "Approved",
	},
	{
		fileNo: "3652",
		loan: "Personal Loan RS 24,000",
		mode: "Lorem",
		applicant: "Meena",
		subscriber: "Client",
		email: "Lorem99@gmail.com",
		phone: "8965412375",
		review: "Lorem is amet so",
		status: "Approved",
	},
	{
		fileNo: "8454",
		loan: "Personal Loan RS 90,000",
		mode: "Lorem",
		applicant: "Mukesh Singh",
		subscriber: "Client",
		email: "Lorem99@gmail.com",
		phone: "8965412375",
		review: "Lorem is amet so",
		status: "Approved",
	},
	{
		fileNo: "9632",
		loan: "Personal Loan RS 20,000",
		mode: "Lorem",
		applicant: "Rashi Mishra",
		subscriber: "Client",
		email: "Lorem99@gmail.com",
		phone: "8965412375",
		review: "Lorem is amet so",
		status: "Approved",
	},
];

export default leads;
