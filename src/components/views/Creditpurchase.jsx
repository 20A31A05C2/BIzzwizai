// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import ApiService from "@/apiService"; // ✅ your custom service
// import { Card, CardContent } from "@/components/ui/card";
// import { useTranslation } from 'react-i18next';

// const Creditspurchase = () => {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { t } = useTranslation();

//   // Fetch purchase history
//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const response = await ApiService("/purchase-history", "GET");
//         if (response.success) {
//           setHistory(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching purchase history", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   // Handle checkout
//   const handleCheckout = async () => {
//     try {
//       const response = await ApiService("/create-checkout-session", "POST");
//       if (response.success && response.data?.url) {
//         window.location.href = response.data.url; // ✅ redirect to Stripe
//       }
//     } catch (error) {
//       console.error("Checkout error:", error);
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Buy Credits Section */}
//       <Card className="shadow-lg rounded-2xl">
//         <CardContent className="p-6 flex flex-col items-center">
//           <h2 className="text-xl font-semibold">Buy Credits</h2>
//           <p className="text-gray-600 mt-2">€9.99 = 50 Credits</p>
//           <Button onClick={handleCheckout} className="mt-4">
//             Buy Now

//           </Button>
//         </CardContent>
//       </Card>

//       {/* Purchase History Section */}
//       <Card className="shadow-lg rounded-2xl">
//         <CardContent className="p-6">
//           <h2 className="text-xl font-semibold mb-4">Purchase History</h2>
//           {loading ? (
//             <p>Loading...</p>
//           ) : history.length > 0 ? (
//             <ul className="space-y-2">
//               {history.map((item) => (
//                 <li
//                   key={item.id}
//                   className="flex justify-between border-b pb-2 text-sm"
//                 >
//                   <span>{item.credits} credits</span>
//                   <span>€{item.amount / 100}</span>
//                   <span>{new Date(item.created_at).toLocaleDateString()}</span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No purchases yet.</p>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Creditspurchase;


import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ApiService from "@/apiService";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Creditspurchase = () => {
  const { t } = useTranslation(); // Namespace for translations
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch purchase history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userId =
          localStorage.getItem("bizwizuser_id") ||
          localStorage.getItem("bizzwiz-userId");
        if (!userId) {
          setHistory([]);
          setLoading(false);
          return;
        }
        const response = await ApiService(
          `/purchase-history?user_id=${userId}`,
          "GET"
        );
        if (response.success) {
          setHistory(response.data);
        } else {
          console.error("Failed to fetch purchase history:", response.error);
        }
      } catch (error) {
        console.error("Error fetching purchase history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Handle checkout
  const handleCheckout = async () => {
    try {
      const userId =
        localStorage.getItem("bizwizuser_id") ||
        localStorage.getItem("bizzwiz-userId");
      const response = await ApiService("/create-checkout-session", "POST", {
        user_id: userId,
      });
      if (response.success && response.data?.url) {
        window.location.href = response.data.url; // Redirect to Stripe
      } else {
        console.error("Checkout failed:", response.error);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-var(--navbar-height,68px))] bg-bizzwiz-background flex flex-col items-center justify-center p-4 sm:p-6 md:p-8"
      role="main"
      aria-label={t("credits_purchase.buy_credits_title")}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-4xl space-y-6"
      >
        {/* Buy Credits Section */}
        <Card className="bg-bizzwiz-card-background backdrop-blur-3xl rounded-3xl shadow-2xl border border-bizzwiz-border">
          <CardContent className="p-6 sm:p-8 flex flex-col items-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl font-semibold text-gradient-bizzwiz font-montserrat"
            >
              {t("credits_purchase.buy_credits_title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-bizzwiz-text-alt text-base sm:text-lg mt-2 font-montserrat text-center"
            >
              {t("credits_purchase.buy_credits_description")}
            </motion.p>
            <Button
              onClick={handleCheckout}
              className="mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-all duration-300 font-montserrat"
              aria-label={t("buy_now_button")}
            >
              {t("credits_purchase.buy_now_button")}
            </Button>
          </CardContent>
        </Card>

        {/* Purchase History Section */}
        <Card className="bg-bizzwiz-card-background backdrop-blur-3xl rounded-3xl shadow-2xl border border-bizzwiz-border">
          <CardContent className="p-6 sm:p-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl sm:text-3xl font-semibold text-gradient-bizzwiz font-montserrat mb-4"
            >
              {t("credits_purchase.purchase_history_title")}
            </motion.h2>
            {loading ? (
              <p className="text-bizzwiz-text-alt font-montserrat">
                {t("credits_purchase.loading")}
              </p>
            ) : history.length > 0 ? (
              <ul className="space-y-2">
                {history.map((item) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-between border-b border-bizzwiz-border/50 pb-2 text-sm sm:text-base font-montserrat"
                  >
                    <span>{t("credits_purchase.credits_label", { count: item.credits })}</span>
                    <span>
                      {t("credits_purchase.amount_label", {
                        amount: (item.amount / 100).toFixed(2),
                      })}
                    </span>
                    <span>
                      {t("credits_purchase.date_label")}:{" "}
                      {new Date(item.created_at).toLocaleDateString(
                        i18n.language || "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-bizzwiz-text-alt font-montserrat">
                {t("credits_purchase.no_purchases")}
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        .text-gradient-bizzwiz {
          background: linear-gradient(to right, #9f43f2, #f43f5e);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </div>
  );
};

export default Creditspurchase;