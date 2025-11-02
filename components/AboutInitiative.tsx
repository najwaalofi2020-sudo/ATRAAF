
import React from 'react';

const AboutInitiative: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 md:p-6 mb-6 shadow-sm">
      <h2 className="text-xl font-bold text-blue-800 mb-4">عن مبادرة "قيم وولاء"</h2>
      
      <div className="space-y-4 text-gray-700">
        <div>
          <h3 className="text-lg font-semibold mb-2">أهدافنا</h3>
          <ul className="list-disc list-inside space-y-1 pr-4">
            <li>تعزيز الهوية الوطنية والانتماء للوطن والولاء لجلالة السلطان.</li>
            <li>تنمية قيم المواطنة الصالحة والسلوكيات الإيجابية لدى الطلاب.</li>
            <li>توعية الطلاب بحقوقهم وواجباتهم في المدرسة والمنزل والمجتمع.</li>
            <li>تمكين الطلاب من مهارات المواطنة الرقمية المسؤولة.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">الفئة المستهدفة</h3>
          <p>
            تستهدف المبادرة أبناءنا وبناتنا الطلاب في جميع المراحل الدراسية بسلطنة عُمان، فهم بناة المستقبل وأمل الوطن.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">تواؤمنا مع رؤية عُمان 2040</h3>
          <p>
            تنسجم أهداف المبادرة بشكل مباشر مع أولويات "رؤية عُمان 2040"، خاصة في محور "الإنسان والمجتمع"، من خلال بناء مجتمع معتز بهويته، ومواطن يتمتع بالمسؤولية والمبادرة.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutInitiative;
