// src/Pages/TenantDashboard.jsx
import { useState, useEffect } from "react";
import {
  Wallet,
  Home,
  Banknote,
  ShieldCheck,
  CalendarCheck,
  FileText,
  Coins
} from "lucide-react";

export default function TenantDashboard() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (accounts && accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setWalletConnected(true);
        }
      } catch (error) {
        console.error("Wallet connection failed", error);
      }
    } else {
      alert("MetaMask not detected");
    }
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setWalletConnected(true);
          }
        } catch (error) {
          console.error("Error checking accounts", error);
        }
      }
    };
    checkWalletConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">👤 Welcome, Tenant</h1>
          {!walletConnected ? (
            <button
              onClick={connectWallet}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
            >
              <Wallet className="w-5 h-5" /> Connect Wallet
            </button>
          ) : (
            <p className="text-sm text-gray-600 truncate">Connected: {walletAddress}</p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <Home className="mx-auto mb-4 h-8 w-8 text-blue-600" />
            <h2 className="text-xl font-semibold">Current Property</h2>
            <p className="text-gray-600">123 Main Street, Dublin</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <Banknote className="mx-auto mb-4 h-8 w-8 text-green-600" />
            <h2 className="text-xl font-semibold">Monthly Rent</h2>
            <p className="text-gray-600">€1,200 due on the 1st</p>
            <button className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700">
              Pay Rent
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <ShieldCheck className="mx-auto mb-4 h-8 w-8 text-yellow-600" />
            <h2 className="text-xl font-semibold">Security Deposit</h2>
            <p className="text-gray-600">€1,500 held in escrow</p>
            <button className="mt-2 w-full border rounded py-1 hover:bg-gray-50">
              Request Refund
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">📋 Rental Activity</h2>
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <ul className="divide-y divide-gray-200">
              <li className="py-2 flex justify-between text-sm">
                <span>August Rent Payment</span><span className="text-green-600">Paid</span>
              </li>
              <li className="py-2 flex justify-between text-sm">
                <span>Maintenance Request – Shower Leak</span><span className="text-yellow-600">Pending</span>
              </li>
              <li className="py-2 flex justify-between text-sm">
                <span>Deposit Refund Eligibility</span><span className="text-gray-500">After Sep 1</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
