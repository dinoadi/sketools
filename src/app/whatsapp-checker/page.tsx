'use client';

import { useState } from 'react';
import { WhatsAppLogo } from '@/components/logos/whatsapp-logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardBody, CardHeader } from '@/components/ui/card';

export default function WhatsAppCheckerPage() {
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!number.trim()) {
      setError('Please enter a phone number');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/checker/whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to check WhatsApp number');
      }

      setResult(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 dark:from-emerald-950 dark:via-green-900 dark:to-teal-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl mb-4 shadow-lg shadow-emerald-500/30">
            <WhatsAppLogo className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">WhatsApp Checker</h1>
          <p className="text-emerald-200 dark:text-emerald-300">
            Check if a WhatsApp number exists and get profile information
          </p>
        </div>

        {/* Main Card */}
        <Card className="max-w-2xl mx-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Check WhatsApp Number
            </h2>
          </CardHeader>
          <CardBody className="p-6">
            {/* Input Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="Enter phone number (e.g., +6281234567890)"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-lg"
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Enter the phone number with country code (e.g., +62 for Indonesia)
                </p>
              </div>

              <Button
                onClick={handleCheck}
                isLoading={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium py-3 text-lg"
              >
                {loading ? 'Checking...' : 'Check Number'}
              </Button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
              </div>
            )}

            {/* Result Section */}
            {result && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${result.exists ? 'bg-green-500' : 'bg-red-500'}`} />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {result.exists ? 'Number Exists' : 'Number Not Found'}
                  </h3>
                </div>

                {result.exists && (
                  <div className="space-y-3">
                    {/* Profile Picture */}
                    {result.profilePicture && (
                      <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <img
                          src={result.profilePicture}
                          alt="Profile"
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Profile Picture
                          </p>
                          <p className="text-gray-900 dark:text-white font-medium">
                            Available
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Name */}
                    {result.name && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Name
                        </p>
                        <p className="text-gray-900 dark:text-white font-medium">
                          {result.name}
                        </p>
                      </div>
                    )}

                    {/* About */}
                    {result.about && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          About
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {result.about}
                        </p>
                      </div>
                    )}

                    {/* Last Seen */}
                    {result.lastSeen && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Last Seen
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {result.lastSeen}
                        </p>
                      </div>
                    )}

                    {/* Status */}
                    {result.status && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Status
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {result.status}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Phone Number Display */}
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-1">
                    Phone Number
                  </p>
                  <p className="text-emerald-900 dark:text-emerald-100 font-mono text-lg">
                    {result.number}
                  </p>
                </div>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Info Section */}
        <div className="max-w-2xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0">
            <CardBody className="p-4 text-center">
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Real-time Check
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Instantly verify WhatsApp numbers
              </p>
            </CardBody>
          </Card>

          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0">
            <CardBody className="p-4 text-center">
              <div className="text-3xl mb-2">👤</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Profile Info
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get name, about, and status
              </p>
            </CardBody>
          </Card>

          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-0">
            <CardBody className="p-4 text-center">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Secure & Private
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your data stays private
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
