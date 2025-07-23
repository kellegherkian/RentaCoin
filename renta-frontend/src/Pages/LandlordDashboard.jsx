"use client";

import { useState, useEffect } from "react";
import {
  Wallet,
  Users,
  BarChart,
  Coins,
} from "lucide-react";

export default function LandlordDashboard() {
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
          <h1 className="text-3xl font-bold">🏠 Welcome, Landlord</h1>
          {!walletConnected ? (
            <button
              onClick={connectWallet}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2"
            >
              <Wallet className="w-5 h-5" /> Connect Wallet
            </button>
          ) : (
            <p className="text-sm text-gray-600 truncate">Connected: {walletAddress}</p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <Users className="mx-auto mb-4 h-8 w-8 text-purple-600" />
            <h2 className="text-xl font-semibold">Current Tenants</h2>
            <p className="text-gray-600">2 Active Contracts</p>
            <button className="mt-2 w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50">
              View Tenants
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <BarChart className="mx-auto mb-4 h-8 w-8 text-indigo-500" />
            <h2 className="text-xl font-semibold">Total Rent Collected</h2>
            <p className="text-gray-600">€2,400 this month</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <Coins className="mx-auto mb-4 h-8 w-8 text-emerald-600" />
            <h2 className="text-xl font-semibold">Deposits Held</h2>
            <p className="text-gray-600">€3,000 in escrow</p>
            <button className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
              Review Requests
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">📈 Payment Activity</h2>
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <ul className="divide-y divide-gray-200 text-sm">
              <li className="py-2 flex justify-between">
                <span>Tenant A – August Rent</span>
                <span className="text-green-600">Received - €1,200</span>
              </li>
              <li className="py-2 flex justify-between">
                <span>Tenant B – August Rent</span>
                <span className="text-green-600">Received - €1,200</span>
              </li>
              <li className="py-2 flex justify-between">
                <span>Deposit Return Request – Tenant A</span>
                <span className="text-yellow-600">Pending</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
