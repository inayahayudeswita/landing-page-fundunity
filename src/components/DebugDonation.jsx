// Debug component untuk test donation di mobile
import React, { useState } from 'react';

const DebugDonation = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    notes: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState([]);

  const addDebugInfo = (message) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const testConnection = async () => {
    addDebugInfo("Testing connection...");
    
    try {
      // Test dengan berbagai URL
      const testUrls = [
        "http://localhost:3000/v1/content/transaction",
        `${window.location.protocol}//${window.location.hostname}:3000/v1/content/transaction`,
        // Jika menggunakan IP
        "http://192.168.1.100:3000/v1/content/transaction", // Ganti dengan IP komputer Anda
      ];

      for (const url of testUrls) {
        try {
          addDebugInfo(`Testing URL: ${url}`);
          const response = await fetch(url, {
            method: "OPTIONS", // Preflight request
            headers: {
              "Content-Type": "application/json",
            },
          });
          addDebugInfo(`URL ${url} - Status: ${response.status}`);
        } catch (error) {
          addDebugInfo(`URL ${url} - Error: ${error.message}`);
        }
      }
    } catch (error) {
      addDebugInfo(`Connection test failed: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    addDebugInfo("Starting donation process...");
    
    try {
      // Debug info
      addDebugInfo(`User Agent: ${navigator.userAgent}`);
      addDebugInfo(`Window location: ${window.location.href}`);
      addDebugInfo(`Hostname: ${window.location.hostname}`);
      addDebugInfo(`Protocol: ${window.location.protocol}`);
      
      // Validasi
      if (!formData.nama.trim() || !formData.email.trim() || !formData.amount) {
        addDebugInfo("Validation failed: Missing required fields");
        alert("Mohon lengkapi semua field yang wajib diisi");
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        addDebugInfo("Validation failed: Invalid email format");
        alert("Format email tidak valid");
        setLoading(false);
        return;
      }

      if (Number(formData.amount) < 1000) {
        addDebugInfo("Validation failed: Amount too small");
        alert("Minimum donasi adalah Rp 1.000");
        setLoading(false);
        return;
      }

      // Coba beberapa URL
      const possibleUrls = [
        "http://localhost:3000/v1/content/transaction",
        `${window.location.protocol}//${window.location.hostname}:3000/v1/content/transaction`,
        // Jika backend di server lain, ganti dengan IP server
        "http://192.168.1.100:3000/v1/content/transaction", // Contoh IP lokal
      ];

      let response = null;
      let usedUrl = null;

      for (const url of possibleUrls) {
        try {
          addDebugInfo(`Trying URL: ${url}`);
          
          response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            mode: 'cors',
            body: JSON.stringify({
              nama: formData.nama.trim(),
              email: formData.email.trim(),
              amount: Number(formData.amount),
              notes: formData.notes.trim(),
            }),
          });

          usedUrl = url;
          addDebugInfo(`Response from ${url}: Status ${response.status}`);
          break; // Jika berhasil, keluar dari loop
        } catch (error) {
          addDebugInfo(`Failed URL ${url}: ${error.message}`);
          continue; // Coba URL berikutnya
        }
      }

      if (!response) {
        throw new Error("Tidak dapat terhubung ke server dengan semua URL yang dicoba");
      }

      const contentType = response.headers.get("content-type");
      addDebugInfo(`Content-Type: ${contentType}`);

      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text();
        addDebugInfo(`Non-JSON response: ${textResponse}`);
        throw new Error("Server tidak mengembalikan JSON response");
      }

      const data = await response.json();
      addDebugInfo(`Response data: ${JSON.stringify(data)}`);

      if (!response.ok) {
        throw new Error(data.error || data.message || `HTTP error! status: ${response.status}`);
      }

      const { redirectUrl } = data;

      if (!redirectUrl) {
        throw new Error("Redirect URL tidak tersedia dari server");
      }

      addDebugInfo(`Redirect URL received: ${redirectUrl}`);
      addDebugInfo("Redirecting to payment page...");

      // Reset form
      setFormData({ nama: "", email: "", notes: "", amount: "" });
      
      // Redirect
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 1000);

    } catch (error) {
      addDebugInfo(`Error occurred: ${error.message}`);
      console.error("Full error:", error);
      
      let errorMessage = "Terjadi kesalahan saat memproses donasi";
      
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        errorMessage = "Tidak dapat terhubung ke server. Pastikan:\n1. Server backend berjalan\n2. Koneksi internet stabil\n3. URL server benar";
      } else if (error.message.includes('CORS')) {
        errorMessage = "Masalah CORS. Backend perlu mengizinkan request dari domain ini.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Debug Donation Form</h2>
      
      <button 
        onClick={testConnection}
        className="w-full mb-4 bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
      >
        Test Connection
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama</label>
          <input
            name="nama"
            type="text"
            value={formData.nama}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            rows={2}
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Amount (IDR)</label>
          <input
            name="amount"
            type="number"
            min="1000"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Donate Now"}
        </button>
      </form>

      {/* Debug Console */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Debug Console:</h3>
        <div className="bg-gray-100 p-3 rounded text-xs max-h-60 overflow-y-auto">
          {debugInfo.map((info, index) => (
            <div key={index} className="mb-1">{info}</div>
          ))}
        </div>
        <button 
          onClick={() => setDebugInfo([])}
          className="mt-2 text-sm bg-red-500 text-white px-3 py-1 rounded"
        >
          Clear Debug
        </button>
      </div>
    </div>
  );
};

export default DebugDonation;