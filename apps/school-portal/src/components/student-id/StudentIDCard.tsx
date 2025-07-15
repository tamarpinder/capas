'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { 
  CameraIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  DevicePhoneMobileIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

interface StudentIDCardProps {
  student: any;
  session: any;
}

export default function StudentIDCard({ student, session }: StudentIDCardProps) {
  const [showBack, setShowBack] = useState(false);
  const [showMobileWallet, setShowMobileWallet] = useState(false);

  const studentData = {
    id: student?.studentId || 'STU-2024-001',
    name: student?.name || session?.user?.name || 'Student Name',
    email: student?.email || session?.user?.email || 'student@capas.edu.bs',
    program: student?.program || 'Arts Program',
    year: student?.year || 2,
    island: student?.island || 'New Providence',
    bloodType: 'O+',
    emergencyContact: '+1 (242) 555-0123',
    validUntil: '05/2026'
  };

  const qrData = JSON.stringify({
    type: 'CAPAS_STUDENT_ID',
    id: studentData.id,
    name: studentData.name,
    program: studentData.program,
    timestamp: new Date().toISOString(),
    institution: 'CAPAS Bahamas'
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* ID Card Display */}
      <div className="relative">
        <motion.div
          animate={{ rotateY: showBack ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full"
        >
          {/* Front of Card */}
          <div 
            className="absolute inset-0"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="bg-gradient-to-br from-capas-turquoise via-capas-ocean to-capas-ocean-dark rounded-2xl p-8 text-white shadow-2xl">
              {/* Card Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl font-bold mb-1">CAPAS BAHAMAS</h2>
                  <p className="text-white/80 text-sm">Caribbean Academy of Performing Arts</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl mb-1">🇧🇸</div>
                  <p className="text-xs text-white/60">Student ID</p>
                </div>
              </div>

              {/* Student Photo and Info */}
              <div className="flex items-start space-x-6 mb-6">
                <div className="relative">
                  <div className="w-28 h-28 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center border-2 border-white/30">
                    {student?.avatar ? (
                      <img src={student.avatar} alt={studentData.name} className="w-full h-full rounded-lg object-cover" />
                    ) : (
                      <div className="text-3xl font-bold">{getInitials(studentData.name)}</div>
                    )}
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <CameraIcon className="h-4 w-4 text-capas-ocean-dark" />
                  </button>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-1">{studentData.name}</h3>
                  <p className="text-white/90 mb-3">{studentData.program}</p>
                  <div className="space-y-1 text-sm text-white/80">
                    <p>ID: {studentData.id}</p>
                    <p>Year {studentData.year} • {studentData.island}</p>
                    <p>Valid Until: {studentData.validUntil}</p>
                  </div>
                </div>
              </div>

              {/* Card Bottom */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-6 bg-white/20 rounded"></div>
                  <div className="w-8 h-6 bg-white/20 rounded"></div>
                  <div className="text-xs text-white/60">NFC Enabled</div>
                </div>
                <button
                  onClick={() => setShowBack(!showBack)}
                  className="text-white/80 hover:text-white text-sm underline"
                >
                  View Back →
                </button>
              </div>
            </div>
          </div>

          {/* Back of Card */}
          <div 
            className="absolute inset-0"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="bg-gradient-to-br from-capas-gold via-capas-coral to-capas-palm rounded-2xl p-8 text-white shadow-2xl h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-bold">Emergency Information</h3>
                <button
                  onClick={() => setShowBack(!showBack)}
                  className="text-white/80 hover:text-white text-sm underline"
                >
                  ← View Front
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/60 mb-1">Blood Type</p>
                    <p className="font-medium">{studentData.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Emergency Contact</p>
                    <p className="font-medium">{studentData.emergencyContact}</p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Email</p>
                    <p className="font-medium text-xs">{studentData.email}</p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Medical Conditions</p>
                    <p className="font-medium">None reported</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="bg-white rounded-lg p-3">
                  <QRCodeSVG
                    value={qrData}
                    size={120}
                    level="M"
                    fgColor="#0A8A98"
                    bgColor="#FFFFFF"
                  />
                </div>
              </div>

              <p className="text-center text-xs text-white/60 mt-4">
                Scan QR code for digital verification
              </p>
            </div>
          </div>
        </motion.div>

        {/* Ensure proper height */}
        <div className="w-full h-[320px]"></div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="flex flex-col items-center p-4 bg-capas-turquoise/10 rounded-lg hover:bg-capas-turquoise/20 transition-colors">
          <ArrowDownTrayIcon className="h-6 w-6 text-capas-turquoise mb-2" />
          <span className="text-sm text-capas-ocean-dark">Download</span>
        </button>

        <button className="flex flex-col items-center p-4 bg-capas-coral/10 rounded-lg hover:bg-capas-coral/20 transition-colors">
          <ShareIcon className="h-6 w-6 text-capas-coral mb-2" />
          <span className="text-sm text-capas-ocean-dark">Share</span>
        </button>

        <button 
          onClick={() => setShowMobileWallet(!showMobileWallet)}
          className="flex flex-col items-center p-4 bg-capas-gold/10 rounded-lg hover:bg-capas-gold/20 transition-colors"
        >
          <DevicePhoneMobileIcon className="h-6 w-6 text-capas-gold mb-2" />
          <span className="text-sm text-capas-ocean-dark">Add to Wallet</span>
        </button>

        <button className="flex flex-col items-center p-4 bg-capas-palm/10 rounded-lg hover:bg-capas-palm/20 transition-colors">
          <CreditCardIcon className="h-6 w-6 text-capas-palm mb-2" />
          <span className="text-sm text-capas-ocean-dark">Print Card</span>
        </button>
      </div>

      {/* Mobile Wallet Instructions */}
      {showMobileWallet && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-capas-sand-light rounded-lg p-6"
        >
          <h4 className="font-semibold text-capas-ocean-dark mb-3">Add to Mobile Wallet</h4>
          <div className="space-y-3 text-sm text-capas-ocean-dark/80">
            <p>• For iPhone: Open Apple Wallet and tap the + button</p>
            <p>• For Android: Open Google Wallet and select "Add to Wallet"</p>
            <p>• Scan the QR code above or use the link sent to your email</p>
            <p>• Your digital ID will be available offline once added</p>
          </div>
          <div className="mt-4 flex items-center space-x-3">
            <button className="btn-capas-primary text-sm px-4 py-2">
              Send to Email
            </button>
            <button className="text-capas-turquoise hover:text-capas-turquoise/80 text-sm font-medium">
              Copy Link
            </button>
          </div>
        </motion.div>
      )}

      {/* Features Info */}
      <div className="bg-gradient-to-r from-capas-turquoise/10 to-capas-ocean/10 rounded-lg p-6">
        <h4 className="font-semibold text-capas-turquoise mb-3">ID Card Features</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-capas-ocean-dark/80">
          <div className="flex items-start space-x-2">
            <span className="text-capas-turquoise">✓</span>
            <span>NFC tap access to campus buildings</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-capas-turquoise">✓</span>
            <span>QR code for quick verification</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-capas-turquoise">✓</span>
            <span>Emergency contact information</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-capas-turquoise">✓</span>
            <span>Works offline with mobile wallet</span>
          </div>
        </div>
      </div>
    </div>
  );
}