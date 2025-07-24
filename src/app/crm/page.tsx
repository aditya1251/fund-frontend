"use client";
import Banner from "@/components/crm/banner";
import LeadOverview from "@/components/crm/leads";
import Statistics from "@/components/crm/statistics";
import Banks from "@/components/crm/banks";
import Testimonials from "@/components/crm/testimonials";
import Footer from "@/components/crm/footer";
import { useGetLoansQuery } from "@/redux/services/loanApi";
export default function Page() {
	const { data } = useGetLoansQuery({ loanType: "" });
	return (
		<>
			<Banner />
			<LeadOverview data={data} />
			<Statistics data={data} />
			<Banks />
			<Testimonials />
			<Footer />
		</>
	);
}
