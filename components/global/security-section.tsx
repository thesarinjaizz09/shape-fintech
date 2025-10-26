'use client'
import { ShieldCheck, CreditCard, Award, Activity } from "lucide-react"

const securityFeatures = [
    { title: "KYC/AML Compliant", icon: <ShieldCheck className="w-4 h-4 text-green-400" /> },
    { title: "Cold Wallet Custody", icon: <CreditCard className="w-4 h-4 text-green-400" /> },
    { title: "Insurance Protection", icon: <Award className="w-4 h-4 text-green-400" /> },
    { title: "Real-Time Auditing", icon: <Activity className="w-4 h-4 text-green-400" /> },
]

const SecurityTrustSection = () => {
    return (
        <div className="w-full bg-[#001f11]/70 border border-green-900/40 backdrop-blur-md shadow-inner hover:shadow-[0_0_20px_rgba(0,255,100,0.05)] rounded-sm p-2 grid grid-cols-1 md:grid-cols-4 md:gap-2 gap-y-2 text-gray-200 backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 transition-all duration-300">
            {securityFeatures.map((feature, idx) => (
                <div
                    key={idx}
                    className="flex flex-row items-center justify-start md:justify-center p-3 bg-gradient-to-r from-emerald-500/20 to-green-800/30 border border-green-900/40 rounded-sm text-center gap-2"
                >
                    <div className="bg-green-900/20 rounded-full">{feature.icon}</div>
                    <span className="text-[10px] font-semibold">{feature.title}</span>
                </div>
            ))}
        </div>
    )
}

export default SecurityTrustSection
