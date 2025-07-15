'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useSession } from 'next-auth/react';

export default function StudentQRCode() {
  const { data: session } = useSession();
  const [showQR, setShowQR] = useState(false);

  const studentData = {
    id: (session?.user as any)?.id || 'STU001',
    name: session?.user?.name || 'Student Name',
    email: session?.user?.email || 'student@capas.edu.bs',
    program: (session?.user as any)?.program || 'Program',
    year: (session?.user as any)?.year || 1,
    island: (session?.user as any)?.island || 'Nassau',
  };

  const qrData = JSON.stringify({
    type: 'CAPAS_STUDENT_ID',
    ...studentData,
    issueDate: new Date().toISOString(),
    institution: 'CAPAS Bahamas'
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="card-capas p-6">
      <div className="text-center">
        <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-4">
          Student ID Card
        </h3>
        
        {/* Student Photo/Avatar */}
        <div className="w-24 h-24 mx-auto mb-4 relative">
          <div className="w-full h-full bg-gradient-to-br from-capas-turquoise to-capas-ocean rounded-full flex items-center justify-center text-white text-2xl font-display font-bold shadow-lg">
            {getInitials(studentData.name)}
          </div>
          {/* Bahamian flag corner */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-capas-gold rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-xs">🇧🇸</span>
          </div>
        </div>

        {/* Student Info */}
        <div className="space-y-2 mb-6">
          <h4 className="font-semibold text-capas-ocean-dark">{studentData.name}</h4>
          <p className="text-sm text-capas-ocean-dark/70">ID: {studentData.id}</p>
          <p className="text-sm text-capas-turquoise font-medium">{studentData.program}</p>
          <p className="text-xs text-capas-ocean-dark/70">Year {studentData.year} • {studentData.island}</p>
        </div>

        {/* QR Code Toggle */}
        <button
          onClick={() => setShowQR(!showQR)}
          className="btn-capas-primary text-sm px-4 py-2 mb-4"
        >
          {showQR ? 'Hide QR Code' : 'Show QR Code'}
        </button>

        {/* QR Code Display */}
        {showQR && (
          <div className="border-2 border-dashed border-capas-turquoise rounded-lg p-4 bg-white">
            {/* Decorative corners with Bahamian motifs */}
            <div className="relative">
              {/* Top corners */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-capas-gold rounded-full opacity-60"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-capas-coral rounded-full opacity-60"></div>
              
              {/* QR Code */}
              <div className="flex justify-center mb-3">
                <QRCodeSVG
                  value={qrData}
                  size={160}
                  level="M"
                  includeMargin={true}
                  fgColor="#0A8A98"
                  bgColor="#FFFFFF"
                />
              </div>
              
              {/* Bottom corners */}
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-capas-palm rounded-full opacity-60"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-capas-ocean rounded-full opacity-60"></div>
            </div>
            
            <p className="text-xs text-capas-ocean-dark/70 mt-2">
              Scan for quick access to student information
            </p>
            
            {/* Ocean wave pattern at bottom */}
            <div className="mt-3 h-2 bg-gradient-to-r from-capas-turquoise via-capas-ocean to-capas-turquoise opacity-20 rounded-full"></div>
          </div>
        )}

        {/* Additional Features */}
        <div className="mt-4 text-xs text-capas-ocean-dark/60 space-y-1">
          <p>🏝️ Proudly Bahamian</p>
          <p>🎓 CAPAS Student Portal</p>
        </div>
      </div>
    </div>
  );
}