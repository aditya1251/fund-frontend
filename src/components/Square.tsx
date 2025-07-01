"use client";

import React from 'react';

// You would ideally use a proper icon library or SVG for these icons.
// For demonstration, these are simple placeholder SVG icons.
const CityIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 15V13H6V15H4ZM11 15V13H13V15H11ZM20 15V13H22V15H20ZM4 19V17H6V19H4ZM11 19V17H13V19H11ZM20 19V17H22V19H20ZM1 11V9H3V11H1ZM8 11V9H10V11H8ZM15 11V9H17V11H15ZM1 15V13H3V15H1ZM8 15V13H10V15H8ZM15 15V13H17V15H15ZM1 19V17H3V19H1ZM8 19V17H10V19H8ZM15 19V17H17V19H15ZM22 5V3H24V5H22Z" fill="currentColor"/>
    <path d="M19 11L19 1L17 1L17 5L15 5L15 1L13 1L13 5L11 5L11 1L9 1L9 5L7 5L7 1L5 1L5 11L19 11Z" fill="currentColor"/>
  </svg>
);

const ConnectorIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.5 14H14V16H15.5V14ZM14 8H15.5V10H14V8ZM8.5 14H10V16H8.5V14ZM10 8H8.5V10H10V8ZM14 11H15.5V13H14V11ZM8.5 11H10V13H8.5V11ZM11.25 11H12.75V13H11.25V11ZM11.25 8H12.75V10H11.25V8ZM11.25 14H12.75V16H11.25V14Z" fill="currentColor"/>
  </svg>
);

const EmployeeIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
  </svg>
);

const FinancialAdvisorIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1L3 5V11C3 16.55 6.84 21.75 12 23C17.16 21.75 21 16.55 21 11V5L12 1ZM12 10.99H17.97C17.43 15.58 14.28 19.46 10 20.77C5.72 19.46 2.57 15.58 2.03 10.99H12ZM12 4.14L19.07 7.21L12 10.28L4.93 7.21L12 4.14Z" fill="currentColor"/>
  </svg>
);

const LendingPartnerIcon: React.FC = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11.25 17.25H9.75V15.75H11.25V17.25ZM12.75 17.25H14.25V15.75H12.75V17.25ZM15 17.25H16.5V15.75H15V17.25ZM7.5 17.25H9V15.75H7.5V17.25ZM11.25 14.25H9.75V12.75H11.25V14.25ZM12.75 14.25H14.25V12.75H12.75V14.25ZM15 14.25H16.5V12.75H15V14.25ZM7.5 14.25H9V12.75H7.5V14.25ZM11.25 11.25H9.75V9.75H11.25V11.25ZM12.75 11.25H14.25V9.75H12.75V11.25ZM15 11.25H16.5V9.75H15V11.25ZM7.5 11.25H9V9.75H7.5V11.25ZM11.25 8.25H9.75V6.75H11.25V8.25ZM12.75 8.25H14.25V6.75H12.75V8.25ZM15 8.25H16.5V6.75H15V8.25ZM7.5 8.25H9V6.75H7.5V8.25ZM12 5.25C9.38 5.25 7.25 7.38 7.25 10C7.25 12.62 9.38 14.75 12 14.75C14.62 14.75 16.75 12.62 16.75 10C16.75 7.38 14.62 5.25 12 5.25ZM12 13.25C10.29 13.25 8.75 11.71 8.75 10C8.75 8.29 10.29 6.75 12 6.75C13.71 6.75 15.25 8.29 15.25 10C15.25 11.71 13.71 13.25 12 13.25Z" fill="currentColor"/>
  </svg>
);


interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => (
  <div className="relative w-[200px] h-[200px] bg-[rgba(255,255,255,0.1)] border border-transparent rounded-[16px] flex flex-col items-center justify-center p-3">
    {/* Icon */}
    <div className="absolute top-[30px] left-[20px] w-[56px] h-[56px] text-black">
      {icon}
    </div>
    {/* Value */}
    <span className="font-['Space_Grotesk'] text-5xl leading-[80px] tracking-[0.02em] text-black absolute top-[70px] left-[20px]">
      {value}
    </span>
    {/* Label */}
    <span className="font-['Space_Grotesk'] text-lg leading-[30px] tracking-[0.02em] uppercase text-black text-center absolute top-[150px] left-[15px] whitespace-nowrap">
      {label}
    </span>
  </div>
);

export default function StatsSection() {
  // Data for the stats cards
  const stats = [
    { icon: <CityIcon />, value: '100+', label: 'cities' },
    { icon: <ConnectorIcon />, value: '3200+', label: 'Connectors' },
    { icon: <EmployeeIcon />, value: '50+', label: 'Employees' },
    { icon: <FinancialAdvisorIcon />, value: '700+', label: 'Financial Advisors' },
    { icon: <LendingPartnerIcon />, value: '125+', label: 'Lending Partners' },
  ];

  return (
    <section className="relative w-full min-h-[358px] bg-[#F7C430] py-16 md:py-24 flex items-center justify-center overflow-hidden">
      {/* Container for the cards, centered and responsive */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 lg:gap-12 xl:gap-[46px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </section>
  );
}
