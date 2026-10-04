import React, { useState } from 'react';

interface SignInScreenProps {
  onSignInSuccess: () => void;
  onExploreAsGuest: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onSignInSuccess,
  onExploreAsGuest,
}) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('marcus.vance@cinephile.org');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Posters for the continuous scrolling columns
  const column1Posters = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBXuSWLwCRtexHV2LLHg-460J70YgHpfLkddrtUdjPWZKfok9qR81LLLNvflf4CYgiKfTDy7gjzlLTBJMWCQqnJhjihMXxJcNKAQ-EyxqPB2BHPVNmBot1u5DBNxKgiSGaId1wyqHZdI02XzFZhS1Eg9BjWrtLO3HvJnoKPAeWJ-IjqFwM2SMCbEbNPusmJ2WAP9LcP4TFYNF8Ti1rkns2bzPNaIlyDNft6Downb9UwYE5ilK8JaT8v4w', // Oppenheimer
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA6h2cgeVzGCeZdXfYOlf9Cv4tAaUBNpt2nngimk9_xfXjFKwAdbG8TWv_S0_4Nhnrlc7kLJmGhhmzOe-zWJT7vwzoCUifpkQUOsd7QY2yuZZmCgUgJYFsaVV0pjBaa3vq34rm7dViZjkCUnfWuHpM45gUeCns0n8pwHtzcRpB1qqWxcAytXNRVkebNwxkN_kFAB6tFifH1BnSzF3NO0oNEoVjtJ6cplU10xMogTtnOEw0gXjzuKjN-hg', // Poor Things
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBt0dsJWv-_GpMdvO77LisfbowHgFDnVX5nbEzbAX_NiurmFfy04xbZbmFrdQiaKsQnLtmP_2WSrHNhFyoV6uR8h6Jp6euPwHfATq5FpYP_OW4YUCpLtO4hSCUfgtGczek5p51OVey9Y6TIbKGHVjrT4UQBlGfp_Wh6mzfI-T_lRAlnAmgUwHwN-TUCCsNCgUFBLXKwG3uen6-HKrw-QqobQUC2Hkiz7-tUydsuVfSydE3qL31KhMWQOw', // Dune 2
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBhRu1B03vP5hfcErV-S-9ggtiJMyGskLA0dQpWlM_k2BNTDsTm6EdhW4WhxsMhBhLjJaSoijHgNhUTFEBk87mY8Zb13u0SI6ASarWWMqDgJQ6zcaDJWjcBTX18q2gwZkxKgVeESrTU48H-D8iDJIRnIgQNlFvHcsNP8eDyJHtsHC0aRripZ8EOlx-yX1lxM37VaJr4W5Qsl-MTjkpPeNjj5VZTMvf22HiXufVZt7lz5sXzyt1SqHMQ4A', // Past Lives
  ];

  const column2Posters = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDICj3VRm-727-cz5_2m6LNWgIzVHfLvl-VW9ntBrLdoPBapVAaRd1AI3k4phqyVbwnUBfP-cvh6CNYrS5ivbAn4gLx36Hadk7Ay2Bmx0mBpiuAOcrt9bf5i8g7WtSS636giSZaMIitVfutqZHxDNUNyB7n0HgXyXExhD4oEQYdRAuru4fnwDzr553zg4IUDPSWChb6sssiNMU_JAN4rQvA2WSx_wpF4_k1ejqNSNC4R6SjfCuMOxsvDw', // Killers of Flower Moon
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCtzqwDPiwH5Kx51_2RH6kqWcg-GgwYK5vMwgs7K4f-vvNUOdvWdFFhUD04h97_HzMw0ageeoTsLaFTqK82tc2B1D9wrRcDVN6wPfjlVF9NoT2AHNyurEguHUR4B1jOzNEE3oqxM_aEuvgX-Xc4V90dlAGMYK4YkMLEThdoNFfvTBpb5hbuD7Y7bhvp1SA3VrRsP0v1xx7KPq8HDHHttrOAuKVtbolZPupkaYWittpQW_zD2EzYF3kVxw', // Zone of Interest
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCqOlqwPzIKkjO-98Xg_SLNr_l-bVs79KTeGk8rqxLTMDjpHsLQNxD5QLq63HdZ82tGofFOkz3hnm0VsRd9aA_KF7P1RbvxwXgp-JHiXgc_uaqPL52JR3I4L-mT9lxHWmPrkn1B8CfXDN6S0jzEi4zA9CxuwidE21oIOGDnX-VPp1xnl5-znT-J5AFDRpsfK8wUKNqrqw4gX3_uDTLAB41bUGfxDrh7-m5YdeyyVz8vPQEyLo1IZ5AClw', // Civil War
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCs5D-q0pvVJDUbRd_tQpiZRcv1q6GYyP6oo5YyGftGc6AsINzXWcR3zjKC0vNGfglo3VZHhJiUu-Em9FK85dsFwwvGNYacseHZtP1kbNTmgiNhsG32DuVhiwC8TyWMF3yfBP8nE6s2C-LEZ8ftUBXF-juLA0qw2XxkT4TlacIXD1lVUvTI5dSBnSA0RHakzvdiwU-DRcq7_BGe8wc5qrAzClx21zFyYt9lAiPpAk846PsIIdq7_8eUYQ', // Spider-Verse
  ];

  const column3Posters = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD_1Z7kXWIdbUshAqFUUp0YThlfsVg0eSRx1wkOb0t34g9STB_JiqGfRt0xrbhNqckcXm98ATFiwwwWtIQACKQdtrus88p1Ra5XGVE5vdg7P1wXO7bTo8dUbv1fY2lUnU_z3XJaejQBTffUYlM5XaU38tn8KYJY77p1XM5L7MIp7yBj1y5Peq63Bc9bKBk9sOIBf8AQ_2HvZUFK_ALXnfSl-0OjYag0p9bKGp2AEZ8UmIrkL-5x_4TATA', // Anatomy of a Fall
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBM9ycXtm2JkklvN1Je_22Ci-xTO-oOTxOeF5TFoeI--0c-7PdRrzZiIWup2gP8yuEz7aiDe5z8R__dvJfvZWiJC2miYYzhB_Mx6pAdzONIFyaBFb0ZPQeBSTCcrl1j7ePUO7RH7dHsntoJwipOvHCqUxydOBoLZCn5-1b4OevjUKONWoDkUCBhEPduoC9wBSWJT105lAjMPdBKd9IsuTl05UJyhFGhlvD9eSiBf-43W5nPb_pMl6q4wQ', // Godzilla x Kong
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB57328Q0qjnM_AhuLhEuwpY1gpQit0llQ-BOzXSAOZXxCMtRASLvlKbJNIKazFCrI6H5CiJOcFhabT19dy82fe0OVCDd0Ft7q3FdbI_oYZumNyQaH_gx7BQdbCFi8w8uaVIvkARnLiJgiJKaiweQUe-dLDXnsepakVp2hOIjdygrsCYvGIM2554Q8sHpsWEDB1PSXaVkDZ60B3bve1-7HqONvEZLQe0dX27nl6kxABiEb46KnFIUdqpQ', // Bob Marley
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBimTDQoTaYPOrx7-2755l82BIiIuJielrS2TwfuKzwvfKrdUTlnlBA6KqJb_Miy08fWtULaBSBqtbj7repu2t4H2hRdnQx_emiPgGIBeCmUC-5su2j49TTWB_EZ8C3AMwVJj-o7gQZBSHb5YMugbLat632fdaQ1LfOFVN-Oh8nSv4--biFzyZApMRDj4Fvxrfih8lM7nxytcZgHWYzKn3YQkdI7k-A_TCncU_-fFQ4b6PBz_oCaqnhJA', // Kung Fu Panda 4
  ];

  const column4Posters = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDeTEJCq04hnz-moIfBGiSZNlgLRkGbD7Tqqy-jJkVQinUHrI5xtP0JXKR_qwNOUbOqy0dyCEEQLy6oeCEkxPGf22KRSzFLE2poapTlZ_LtAbu5T8k15GFfCN9lf6EGYMsaNl5FZNBZ81lhbjsLadfn6jUPMD_Ihlysoj7tTLvRUwrj19kAmkrHWGlryTqO632jXnVLzJOrUhDe-mbC_6FFkspr_qvDBQxt3lEJmSArPW3ncf3GWKHkug', // Neo Noir
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBXuSWLwCRtexHV2LLHg-460J70YgHpfLkddrtUdjPWZKfok9qR81LLLNvflf4CYgiKfTDy7gjzlLTBJMWCQqnJhjihMXxJcNKAQ-EyxqPB2BHPVNmBot1u5DBNxKgiSGaId1wyqHZdI02XzFZhS1Eg9BjWrtLO3HvJnoKPAeWJ-IjqFwM2SMCbEbNPusmJ2WAP9LcP4TFYNF8Ti1rkns2bzPNaIlyDNft6Downb9UwYE5ilK8JaT8v4w', // Oppenheimer
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA6h2cgeVzGCeZdXfYOlf9Cv4tAaUBNpt2nngimk9_xfXjFKwAdbG8TWv_S0_4Nhnrlc7kLJmGhhmzOe-zWJT7vwzoCUifpkQUOsd7QY2yuZZmCgUgJYFsaVV0pjBaa3vq34rm7dViZjkCUnfWuHpM45gUeCns0n8pwHtzcRpB1qqWxcAytXNRVkebNwxkN_kFAB6tFifH1BnSzF3NO0oNEoVjtJ6cplU10xMogTtnOEw0gXjzuKjN-hg', // Poor Things
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBhRu1B03vP5hfcErV-S-9ggtiJMyGskLA0dQpWlM_k2BNTDsTm6EdhW4WhxsMhBhLjJaSoijHgNhUTFEBk87mY8Zb13u0SI6ASarWWMqDgJQ6zcaDJWjcBTX18q2gwZkxKgVeESrTU48H-D8iDJIRnIgQNlFvHcsNP8eDyJHtsHC0aRripZ8EOlx-yX1lxM37VaJr4W5Qsl-MTjkpPeNjj5VZTMvf22HiXufVZt7lz5sXzyt1SqHMQ4A', // Past Lives
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid cinephile email address.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onSignInSuccess();
    }, 600);
  };

  const handleDemoSignIn = () => {
    setEmail('marcus.vance@cinephile.org');
    setPassword('••••••••••••');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignInSuccess();
    }, 400);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0e0e10] flex flex-col justify-between select-none">
      {/* ============================================================== */}
      {/* CONTINUOUS SCROLLING POSTER WALL (SCROLLING BACKGROUND)          */}
      {/* ============================================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 -rotate-6 scale-110 -translate-y-12 h-[150vh]">
          {/* Column 1 - Scrolling UP Slow */}
          <div className="flex flex-col gap-5 animate-marquee-up-slow">
            {[...column1Posters, ...column1Posters, ...column1Posters].map((url, i) => (
              <div
                key={`c1-${i}`}
                className="w-full aspect-[2/3] rounded-xl overflow-hidden bg-[#1c1b1d] shadow-2xl ring-1 ring-white/10"
              >
                <img
                  src={url}
                  alt="Cinema Poster"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter grayscale-[15%] contrast-110"
                />
              </div>
            ))}
          </div>

          {/* Column 2 - Scrolling DOWN Normal */}
          <div className="flex flex-col gap-5 animate-marquee-down-normal">
            {[...column2Posters, ...column2Posters, ...column2Posters].map((url, i) => (
              <div
                key={`c2-${i}`}
                className="w-full aspect-[2/3] rounded-xl overflow-hidden bg-[#1c1b1d] shadow-2xl ring-1 ring-white/10"
              >
                <img
                  src={url}
                  alt="Cinema Poster"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter grayscale-[15%] contrast-110"
                />
              </div>
            ))}
          </div>

          {/* Column 3 - Scrolling UP Normal */}
          <div className="hidden md:flex flex-col gap-5 animate-marquee-up-normal">
            {[...column3Posters, ...column3Posters, ...column3Posters].map((url, i) => (
              <div
                key={`c3-${i}`}
                className="w-full aspect-[2/3] rounded-xl overflow-hidden bg-[#1c1b1d] shadow-2xl ring-1 ring-white/10"
              >
                <img
                  src={url}
                  alt="Cinema Poster"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter grayscale-[15%] contrast-110"
                />
              </div>
            ))}
          </div>

          {/* Column 4 - Scrolling DOWN Slow */}
          <div className="hidden md:flex flex-col gap-5 animate-marquee-down-slow">
            {[...column4Posters, ...column4Posters, ...column4Posters].map((url, i) => (
              <div
                key={`c4-${i}`}
                className="w-full aspect-[2/3] rounded-xl overflow-hidden bg-[#1c1b1d] shadow-2xl ring-1 ring-white/10"
              >
                <img
                  src={url}
                  alt="Cinema Poster"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter grayscale-[15%] contrast-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Atmospheric Overlays & Ambient Crimson Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-[#0e0e10]/85 to-[#0e0e10]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0e0e10]/70 to-[#0e0e10] pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#e50914]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-[500px] h-[350px] bg-[#ffb95f]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-20 max-w-[1440px] w-full mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1UxqscHtMbnDNW0xOAx_V0AK-MYhX9un2zsw55_djRRZJUg4nqTf0x3ZBl209HFGasC5Gi8QckcDJsVmnTlomxxe-IBxhn_MhXRajHB2FSlMjMqKjZcJkCjCqms7fvzoUrr_L9ud-usQBhy1HK4zLtATyDHflVWudkUdihYuulHLWRFoT-3IY1ZlpB_Y8bDsYRAushTOZ0eKnXR9RWe-52ut7_d5mToVq1-j5wGZBWDU0wQTQPrOgyhwBwb"
            alt="CineRate Logo"
            className="h-9 w-auto object-contain"
          />
          <span className="font-serif text-2xl font-bold tracking-tight text-[#e5e1e4]">
            Cine<span className="text-[#e50914]">Rate</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExploreAsGuest}
            className="text-xs font-medium text-[#c5c5d5] hover:text-white px-3 py-1.5 rounded-lg hover:bg-[#201f21] transition-colors flex items-center gap-1.5"
          >
            <span>Preview Catalog as Guest</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </header>

      {/* Centered Authentication Card */}
      <div className="relative z-20 w-full max-w-md mx-auto px-5 py-6">
        <div className="bg-[#1c1b1d]/90 backdrop-blur-2xl border border-[#353437]/80 rounded-2xl p-7 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
          {/* Subtle Ambient Red Line Accent at Top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e50914] to-transparent opacity-80" />

          {/* Form Title & Switcher */}
          <div className="text-center mb-6">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[#ffb4aa] bg-[#e50914]/15 px-2.5 py-0.5 rounded-full mb-2">
              Cinema Rating & Critique
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#e5e1e4] tracking-tight">
              {isRegisterMode ? 'Create Cinephile Account' : 'Welcome Back'}
            </h1>
            <p className="text-xs text-[#c5c5d5] mt-1.5 leading-relaxed">
              {isRegisterMode
                ? 'Track your film journey, log ratings, and join certified critic debates.'
                : 'Sign in to access your film diary, custom lists, and verified ratings.'}
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center p-1 bg-[#131315] rounded-lg mb-6 border border-[#2a2a2c]">
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(false);
                setErrorMsg('');
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                !isRegisterMode
                  ? 'bg-[#2a2a2c] text-white shadow-sm'
                  : 'text-[#c5c5d5] hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(true);
                setErrorMsg('');
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                isRegisterMode
                  ? 'bg-[#2a2a2c] text-white shadow-sm'
                  : 'text-[#c5c5d5] hover:text-white'
              }`}
            >
              Join CineRate
            </button>
          </div>

          {/* Quick 1-Click Demo Login Banner */}
          {!isRegisterMode && (
            <div className="mb-5 p-3 rounded-xl bg-[#201f21] border border-[#ffb95f]/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg3_FufF0y0hJcrYoBeJhy2ztNDpZEHYgyAD351iNRlCpQI1KHzAeLPO8v0tMY-M2ezKfIcWi1vMljQkVB1gQ8Kuv5AG2f3Y_9sDaygclsyPTLd9rrSwTnGpCLPxKEBUkvXx2rCeTHvjDmne06osu9jGKNAYmHosPXnaJN9fs62Nulw9c_bTU-Jfdr5ZR8zvkemKCYMYQ0Rdyj6s1OCyZ1RB3JCDpzjfpnnOeK0fyANXq682YNG4HCNg"
                  alt="Marcus Vance Avatar"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-[#ffb95f]"
                />
                <div className="text-left">
                  <div className="text-xs font-bold text-white flex items-center gap-1">
                    <span>Marcus Vance</span>
                    <span className="text-[10px] text-[#ffb95f] font-normal">PRO</span>
                  </div>
                  <div className="text-[10px] text-[#c5c5d5]">148 films · 32 reviews logged</div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDemoSignIn}
                className="px-2.5 py-1 text-[11px] font-semibold bg-[#ffb95f] text-[#2a1700] hover:bg-[#ffddb8] rounded-md transition-colors whitespace-nowrap shadow-sm"
              >
                1-Click Demo
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-2.5 text-xs text-[#ffb4ab] bg-[#93000a]/30 border border-[#93000a] rounded-lg">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-medium text-[#c5c5d5] mb-1 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#70717f]">
                  mail
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@cinephile.org"
                  className="w-full bg-[#131315] text-[#e5e1e4] text-xs pl-9 pr-3 py-2.5 rounded-lg border border-[#353437] focus:border-[#e50914] focus:outline-none focus:ring-1 focus:ring-[#e50914] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-medium text-[#c5c5d5] uppercase tracking-wider">
                  Password
                </label>
                {!isRegisterMode && (
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[11px] text-[#ffb4aa] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#70717f]">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#131315] text-[#e5e1e4] text-xs pl-9 pr-9 py-2.5 rounded-lg border border-[#353437] focus:border-[#e50914] focus:outline-none focus:ring-1 focus:ring-[#e50914] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#70717f] hover:text-[#e5e1e4] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-[#c5c5d5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#353437] bg-[#131315] text-[#e50914] focus:ring-[#e50914] h-3.5 w-3.5"
                />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-[#e50914] hover:bg-[#c0000c] text-white font-semibold text-xs rounded-lg transition-all shadow-[0_0_24px_rgba(229,9,20,0.35)] flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isRegisterMode ? 'Create Account & Begin Diary' : 'Sign In to CineRate'}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#353437]" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-[#1c1b1d] px-2 text-[#70717f]">Or Continue With</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleDemoSignIn}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#201f21] hover:bg-[#2a2a2c] text-[#e5e1e4] text-xs font-medium border border-[#353437] transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-1.9.4-2.7L1.6 6.4C.6 8.4 0 10.6 0 13s.6 4.6 1.6 6.6l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16c1.9 3.8 5.8 7 10.4 7z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={handleDemoSignIn}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#201f21] hover:bg-[#2a2a2c] text-[#e5e1e4] text-xs font-medium border border-[#353437] transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.66-.82 1.11-1.96.99-3.1-.96.04-2.13.64-2.82 1.45-.61.71-1.14 1.87-1 2.98 1.07.08 2.17-.51 2.83-1.33z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Quick Direct Link to Movie Rating screen */}
          <div className="mt-5 pt-4 border-t border-[#353437]/60 text-center">
            <button
              type="button"
              onClick={onExploreAsGuest}
              className="text-xs text-[#ffb4aa] hover:text-white transition-colors font-medium flex items-center justify-center gap-1 mx-auto"
            >
              <span>Or explore movies without signing in</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Community Proof Badges */}
        <div className="mt-5 flex items-center justify-center gap-4 text-[11px] text-[#70717f]">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-[#ffb95f]">verified</span>
            <span>420k+ Ratings</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-[#e50914]">theaters</span>
            <span>70mm & IMAX</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-[#ffb95f]">stars</span>
            <span>Critic Discourse</span>
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 max-w-[1440px] w-full mx-auto px-6 py-4 text-center text-[11px] text-[#70717f]">
        © 2026 CineRate Media Inc. Crafted for discerning cinephiles worldwide.
      </footer>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1c1b1d] border border-[#353437] rounded-xl max-w-sm w-full p-6 text-left shadow-2xl relative">
            <button
              type="button"
              onClick={() => {
                setShowForgotModal(false);
                setResetSent(false);
              }}
              className="absolute top-4 right-4 text-[#c5c5d5] hover:text-white"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <h3 className="font-serif text-lg font-bold text-white mb-2">Reset Password</h3>
            <p className="text-xs text-[#c5c5d5] mb-4">
              Enter your email and we'll send you an encrypted link to reset your cinephile credentials.
            </p>

            {resetSent ? (
              <div className="p-3 bg-[#e50914]/15 border border-[#e50914]/40 rounded-lg text-xs text-[#ffb4aa] text-center">
                ✓ Password reset link sent to <strong>{forgotEmail || email}</strong>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setResetSent(true);
                }}
                className="space-y-3"
              >
                <input
                  type="email"
                  value={forgotEmail || email}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#131315] text-[#e5e1e4] text-xs px-3 py-2 rounded-lg border border-[#353437] focus:border-[#e50914] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#e50914] text-white text-xs font-semibold rounded-lg hover:bg-[#c0000c] transition-colors"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
