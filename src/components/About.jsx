import { useState } from 'react';

const About = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const sections = {
    overview: {
      title: "गावाचे विहंगावलोकन",
      content: (
        <div className="space-y-6 text-gray-700">
          <p className="leading-relaxed">
            कोहळा जटेश्वर हे महाराष्ट्रातील अमरावती जिल्ह्यातील नांदगाव खांडेश्वर तालुक्यातील एक नयनरम्य आणि शांत गाव आहे. १,००९.३७ हेक्टर (सुमारे २,४९४ एकर) क्षेत्रावर पसरलेले, हे गाव २००९ च्या जनगणनेनुसार १,१९० लोकसंख्येचे आहे, ज्यात ५८० पुरुष आणि ६१० महिला यांचा समावेश आहे. लिंग गुणोत्तर ९५.०८ आहे, जे जवळपास १:१ आहे.
          </p>
          <p className="leading-relaxed">
            नांदगाव खांडेश्वर ग्रामपंचायती अंतर्गत येणारे हे गाव ३ प्रभाग आणि १२ पूर्णवेळ सरकारी कर्मचाऱ्यांसह कार्यरत आहे. गावात प्राथमिक मराठी शाळा आहे, जी स्थानिक मुलांना शिक्षण प्रदान करते. कोहळा जटेश्वर अमरावती शहरापासून ३८ किमी आणि तालुका मुख्यालय मुंड निशानकराव येथून २५ किमी अंतरावर आहे.
          </p>
          <p className="leading-relaxed">
            चांगल्या रस्त्यांमुळे गाव अमरावती, अकोला आणि इतर जवळच्या शहरांशी जोडले गेले आहे. शेती हा गावाच्या अर्थव्यवस्थेचा कणा आहे, ज्यामध्ये कापूस आणि संत्री ही प्रमुख पिके आहेत.
          </p>
        </div>
      ),
    },
    geography: {
      title: "भौगोलिक माहिती",
      content: (
        <div className="space-y-6 text-gray-700">
          <p className="leading-relaxed">
            कोहळा जटेश्वर गाव अमरावती जिल्ह्याच्या उत्तर-पूर्व भागात, सातपुडा पर्वतरांगेच्या दक्षिणेकडील पायथ्याशी वसलेले आहे. गावाचा भूभाग डेक्कन ट्रॅपने बनलेला आहे, आणि काही भागात बेंबाला नदीच्या गाळाने तयार झालेली खारट माती आढळते.
          </p>
          <p className="leading-relaxed">
            बेंबाला नदी, जी गावाच्या जवळून वाहते, शेती आणि पाणी पुरवठ्यासाठी महत्त्वाची आहे. ही नदी अमरावती आणि यवतमाळ जिल्ह्यांमधील जल व्यवस्थापनात मोलाची भूमिका बजावते, विशेषतः पावसाळ्यात.
          </p>
          <p className="leading-relaxed">
            गाव समुद्रसपाटीपासून सुमारे ३३८ मीटर उंचीवर आहे. येथील उष्णकटिबंधीय हवामानात तीन ऋतू आहेत: उन्हाळा (मार्च-जून), पावसाळा (जुलै-ऑक्टोबर), आणि हिवाळा (नोव्हेंबर-फेब्रुवारी). सरासरी वार्षिक पर्जन्यमान ८००-१,००० मिमी आहे.
          </p>
        </div>
      ),
    },
    culture: {
      title: "संस्कृती आणि परंपरा",
      content: (
        <div className="space-y-6 text-gray-700">
          <p className="leading-relaxed">
            कोहळा जटेश्वर गावात महाराष्ट्रीयन संस्कृतीचा समृद्ध वारसा दिसून येतो. गणेशोत्सव, दिवाळी आणि होळी यासारखे सण मोठ्या उत्साहाने साजरे केले जातात. स्थानिक लोक लावणी आणि भक्तीगीते यासारख्या पारंपरिक लोकनृत्य आणि संगीतात सहभागी होतात.
          </p>
          <p className="leading-relaxed">
            गावातील मंदिरे आणि सामुदायिक सभागृह येथे वार्षिक सांस्कृतिक कार्यक्रम आयोजित केले जातात. जवळच्या अमरावती शहरातील अंबादेवी मंदिर हे धार्मिक आणि सांस्कृतिक केंद्र आहे, जिथे गावकरी वार्षिक यात्रेसाठी भेट देतात.
          </p>
          <p className="leading-relaxed">
            स्थानिक खाद्यसंस्कृतीत भाकरी, पांढरा रस्सा, आणि वडा पाव यासारखे मराठमोळे पदार्थ लोकप्रिय आहेत, जे गावातील बाजार आणि घरगुती जेवणात आढळतात.
          </p>
        </div>
      ),
    },
    services: {
      title: "सेवा आणि सुविधा",
      content: (
        <div className="space-y-6 text-gray-700">
          <p className="leading-relaxed">
            कोहळा जटेश्वर गावात ग्रामपंचायतीद्वारे पाणी पुरवठा, रस्ते देखभाल आणि स्वच्छता कार्यक्रम यासारख्या सेवा पुरवल्या जातात. बेंबाला नदीवर बांधलेले सिमेंट बंधारे पावसाच्या पाण्याचे संचय आणि शेतीसाठी उपयुक्त ठरतात, जे शिवकालीन पाणी साठवण योजनेचा भाग आहे.
          </p>
          <p className="leading-relaxed">
            गावात प्राथमिक आरोग्य केंद्र आणि ग्रामपंचायत कार्यालय आहे, जे मूलभूत वैद्यकीय सेवा आणि प्रशासकीय सहाय्य पुरवते. जन्म, मृत्यू आणि विवाह प्रमाणपत्रांसाठी ऑनलाइन अर्जाची सुविधा उपलब्ध आहे.
          </p>
          <p className="leading-relaxed">
            हा ॲप गावकऱ्यांना गावातील कार्यक्रम, पाणी पुरवठा वेळापत्रक आणि अस्वच्छ जागेच्या तक्रारी नोंदवण्यासाठी एक सुलभ व्यासपीठ प्रदान करतो, ज्यामुळे स्थानिक प्रशासनाशी संवाद सुलभ होतो.
          </p>
        </div>
      ),
    },
    map: {
      title: "गावाचा नकाशा",
      content: (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            कोहळा जटेश्वर गाव अमरावती जिल्ह्याच्या उत्तर-पूर्व भागात, नांदगाव खांडेश्वर तालुक्यात वसलेले आहे. खालील नकाशावर जटेश्वर महाराज मंदिर, गावातील एक प्रमुख स्थळ, दर्शविलेली आहे, जे अमरावती शहरापासून 28 किमी अंतरावर आहे.
          </p>
          <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24156.74478770861!2d77.6690674332345!3d20.69814046560319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6b35c9244f6f5%3A0x66aa030c6533f208!2sJateshwar%20Maharaj%20Mandir!5e1!3m2!1sen!2sin!4v1749846724906!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kohvala Jateshwar Map"
            ></iframe>
          </div>
        </div>
      ),
    },
  };

  const carouselItems = [
    { title: "गावातील शेती", description: "कापूस आणि संत्र्याच्या शेतीने समृद्ध कोहळा जटेश्वर", color: "from-green-500 to-teal-500" },
    { title: "बेंबाला नदी", description: "गावाच्या जीवनरेषा, शेती आणि पाण्यासाठी महत्त्वाची", color: "from-blue-500 to-cyan-500" },
    { title: "सांस्कृतिक उत्सव", description: "गणेशोत्सव आणि होळीचा उत्साह", color: "from-purple-500 to-pink-500" },
  ];

  const nextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-green-50 p-6 pt-24">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 tracking-tight drop-shadow-xl animate-slide-in">
          कोहळा जटेश्वर बद्दल
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-3 animate-fade-in">
          आमच्या गावाची समृद्ध संस्कृती, भौगोलिक वैशिष्ट्ये आणि सेवा
        </p>
      </div>

      {/* Carousel Section */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="relative bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white border-opacity-20 overflow-hidden">
          <div
            className={`relative bg-gradient-to-r ${carouselItems[carouselIndex].color} p-8 rounded-xl text-white transition-all duration-500 transform animate-slide-up`}
          >
            <h3 className="text-2xl font-bold mb-2">{carouselItems[carouselIndex].title}</h3>
            <p className="text-lg">{carouselItems[carouselIndex].description}</p>
          </div>
          <button
            onClick={prevCarousel}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 p-2 rounded-full text-gray-800 hover:bg-opacity-50 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextCarousel}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 p-2 rounded-full text-gray-800 hover:bg-opacity-50 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center mb-8 space-x-4 space-y-2 md:space-y-0">
        {Object.keys(sections).map((key) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-110 ${
              activeSection === key
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg'
                : 'bg-white bg-opacity-90 text-gray-700 hover:bg-opacity-100 hover:shadow-md'
            }`}
          >
            {sections[key].title}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white border-opacity-20 transform transition-all hover:scale-105 animate-slide-up">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 tracking-wide">
          {sections[activeSection].title}
        </h2>
        {sections[activeSection].content}
        <div className="mt-8 text-gray-600">
          <p className="flex items-center text-lg">
            <svg
              className="w-7 h-7 text-indigo-500 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            संपर्क: ग्रामपंचायत कार्यालय, कोहळा जटेश्वर, नांदगाव खांडेश्वर, अमरावती, पिन: ४४४७०१. फोन: १२३४-५६७-८९०
          </p>
        </div>
      </div>

      {/* Custom Tailwind styles for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slideIn 1s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 1s ease-out;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default About;