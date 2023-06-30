const { Template } = require("../models");

async function seedTemplates() {
  const templates = [
    {
      title: "Understanding Glaucoma",
      description: "Overview of Glaucoma",
      category_id: 1,
      markdown: `# Glaucoma: The Silent Thief of Vision

Glaucoma is a progressive eye disease that affects the optic nerve, which is responsible for transmitting visual information from the eye to the brain. It is often referred to as the "silent thief of vision" because it can gradually damage your eyesight without any noticeable symptoms until it reaches an advanced stage.

<img class="img-reduced-width-centred" src="/api/images/1" alt="Normal eye and eye with glaucoma" width="1000" height="371">

## What Causes Glaucoma?

The primary cause of glaucoma is an increase in intraocular pressure (IOP) within the eye. This pressure builds up when the fluid inside the eye, called aqueous humor, cannot drain properly. The increased pressure puts strain on the optic nerve, leading to its gradual deterioration and potential vision loss.

## Types of Glaucoma

There are different types of glaucoma, but the two most common ones are:

1. **Primary Open-Angle Glaucoma**: This is the most prevalent form of glaucoma. It develops gradually and painlessly, usually without any noticeable symptoms until vision loss occurs. The drainage angle in the eye becomes less efficient over time, leading to increased IOP.

2. **Angle-Closure Glaucoma**: This type of glaucoma is less common but can cause sudden and severe symptoms. It occurs when the drainage angle in the eye becomes blocked or completely closed, leading to a rapid increase in IOP. Angle-closure glaucoma requires immediate medical attention.

## Risk Factors

Several factors can increase the risk of developing glaucoma, including:

- **Age**: The risk of glaucoma increases with age, especially after the age of 60.
- **Family History**: If you have a family history of glaucoma, your risk is higher.
- **Race**: People of African, Hispanic, and Asian descent are more susceptible to certain types of glaucoma.
- **Medical Conditions**: Certain medical conditions like diabetes, high blood pressure, and heart disease can increase the risk of glaucoma.
- **Eye Injury or Surgery**: Previous eye injuries or surgeries can contribute to the development of glaucoma.
- **Myopia**: Being myopic (shortsighted) increases the risk of glaucoma, and the more shortsighted you are, the bigger the risk.

## Detecting and Treating Glaucoma

Regular eye examinations are crucial for early detection and management of glaucoma. During an eye exam, your optometrist will measure your IOP, inspect the optic nerve, and assess your visual field. Additionally, they may use advanced imaging tests to get a detailed view of the optic nerve and monitor any changes.

Treatment for glaucoma aims to lower the IOP and prevent further damage to the optic nerve. Common treatment options include:

- **Medication**: Eye drops and rarely oral medications can be prescribed to reduce the production of aqueous humor or improve its drainage.
- **Laser Therapy**: Laser procedures can help improve the drainage of fluid or reduce fluid production in the eye.
- **Surgery**: In some cases, surgical interventions may be necessary to create a new drainage channel or relieve pressure on the optic nerve.

## Importance of Early Intervention

Early detection and treatment are crucial in managing glaucoma. While vision loss due to glaucoma cannot be reversed, appropriate intervention can slow down or halt its progression, preserving your remaining eyesight. Regular eye exams, especially if you have risk factors, can help catch glaucoma at its early stages when treatment options are most effective.

Remember, even if you have good vision, it is essential to prioritize regular eye check-ups to ensure the health of your eyes and maintain optimal vision throughout your life.

*Disclaimer: This guide provides general information and should not substitute professional medical advice. Please consult your eye care professional for personalized recommendations and guidance.*`,
      html: "",
      administrator_id: 1,
    },
    {
      title: "Understanding Myopia (Shortsightedness)",
      description:
        "An overview of myopia (shortsightedness) and its causes, symptoms, risks, and interventions.",
      markdown: `# Overview of Myopia

Myopia, commonly known as nearsightedness, is a refractive error that affects the eye's ability to focus on distant objects clearly. If you have myopia, you may experience clear vision when looking at objects up close, but distant objects appear blurred or fuzzy.

## Causes and Symptoms

Myopia occurs when the eyeball is slightly longer than normal or when the cornea (the clear front part of the eye) has excessive curvature. These factors cause the incoming light to focus in front of the retina instead of directly on it, resulting in blurred distance vision.

<img class="img-reduced-width-centred" src="/api/images/2" alt="Myopic eye and myopic eye with lens" width="1000">

Common symptoms of myopia include:

- Blurred vision when looking at distant objects
- Squinting or straining to see clearly
- Headaches or eye fatigue after focusing on distant objects for prolonged periods
- Difficulties seeing the board or screen at school or work

## Myopia Progression and Risks

It is important to address myopia, especially in children, as it can progress over time and lead to increased visual impairment. However, interventions are available to help slow down or reduce the progression of myopia.

Certain factors, such as spending excessive time on near work activities (such as reading or using electronic devices), genetic predisposition, and environmental factors, can contribute to myopia progression.

Myopia is not only a visual concern but also increases the risks of developing other eye conditions, especially later in life, including:

1. **Cataracts:** the clouding of the eye's natural lens, leading to blurred or hazy vision.

2. **Macular Degeneration:** a condition that affects the central part of the retina, leading to gradual vision loss.

3. **Retinal Detachment:** a serious condition where the retina becomes separated from its supporting tissues. Retinal detachment requires immediate medical attention to prevent permanent vision loss.

## Myopia Interventions

Optometrists can recommend various interventions to manage and control myopia progression. These interventions aim to slow down the elongation of the eyeball and help maintain clearer distance vision. Some common interventions include:

1. **Atropine Eye Drops:** Low-dose atropine eye drops are used to dilate the pupil and temporarily relax the focusing mechanism of the eye. This intervention has shown promising results in slowing down myopia progression in children.

2. **Orthokeratology (Ortho-K):** Ortho-K involves using specially designed rigid contact lenses that reshape the cornea overnight. By wearing these lenses while sleeping, the cornea is temporarily reshaped, providing clearer vision during the day without the need for glasses or contact lenses.

3. **Myopia-Control Spectacles:** These are eyeglasses specifically designed to reduce the progression of myopia. They incorporate special lens designs or coatings to help optimize visual clarity and slow down the elongation of the eyeball.

4. **Myopia Control Contact Lenses:** Similar to myopia-control spectacles, specific contact lenses are available that can help manage myopia progression. These lenses may have different designs or optical properties to address the underlying causes of myopia.

## Importance of Regular Eye Examinations

Regular eye examinations, typically annual, are crucial for myopic individuals, particularly children, to monitor their vision, eye health and myopia progression. Optometrists can assess the effectiveness of interventions, prescribe suitable visual corrections, and detect any potential eye health issues at an early stage.

## How to Correct Myopia

There are several methods available to correct myopia and improve vision. The most common approaches include the use of spectacles, prescription sunglasses, contact lenses, orthokeratology, and refractive surgery. Each method has its advantages and considerations, and the choice depends on various factors such as lifestyle, personal preferences, and the advice of an optometrist.

### Spectacles

Spectacles, also known as eyeglasses, are a popular and effective option for correcting myopia. They consist of lenses that are specially designed to compensate for the refractive error and bring distant objects into focus. Spectacles are easy to use, affordable, and suitable for people of all ages. They can be customized according to an individual's prescription and personal style preferences.

### Prescription Sunglasses

For individuals with myopia who spend a significant amount of time outdoors, prescription sunglasses are a practical solution. Prescription sunglasses combine the benefits of vision correction with protection from harmful ultraviolet (UV) rays. They come in various styles and lens tints to suit different light conditions and provide visual comfort while enjoying outdoor activities.

### Contact Lenses

Contact lenses are an alternative to spectacles for correcting myopia. These small, thin lenses are directly placed on the surface of the eye. They correct vision by focusing light properly onto the retina. Contact lenses offer a wider field of view, natural appearance, and freedom from the constraints of wearing spectacles. However, proper hygiene, lens care, and regular follow-up with an optometrist are crucial to maintain eye health when using contact lenses.

### Orthokeratology

Orthokeratology, commonly known as ortho-k or corneal reshaping therapy, is a non-surgical approach to correct myopia. This method involves wearing specially designed rigid gas permeable contact lenses overnight. The lenses reshape the cornea temporarily, allowing for improved vision during the day without the need for glasses or contact lenses. Orthokeratology is typically recommended for individuals with mild to moderate myopia and can provide temporary myopia control benefits.

### Refractive Surgery

Refractive surgery offers a long-term solution for myopia correction by permanently reshaping the cornea. Laser-assisted procedures, such as LASIK, SMILE, and PRK, are commonly used to correct myopia. These surgeries aim to change the cornea's curvature to focus light properly on the retina, eliminating the need for glasses or contact lenses. Refractive surgery is a significant decision and requires thorough evaluation, consultation with an ophthalmologist, and consideration of potential risks and benefits.

It is important to note that the correction methods mentioned above are intended for vision improvement and myopia management. Regular eye examinations and consultations with qualified optometrists are essential to determine the most suitable approach for individual needs and to ensure proper eye health management.

*Disclaimer: This guide provides general information and should not substitute professional medical advice. Please consult your eye care professional for personalized recommendations and guidance.*`,
      category_id: 2,
      html: "",
      administrator_id: 1,
    },
    {
      title: "Understanding Hyperopia (Longsightedness)",
      description:
        "An overview of hyperopia (Longsightedness) and its causes, symptoms, and treatment options.",
      markdown: `# Overview of Hyperopia (Longsightedness)

Hyperopia, commonly known as longsightedness or farsightedness, is a refractive error that affects the ability to see nearby objects clearly while distant objects appear relatively clearer. It is a common vision condition that can affect people of all ages. In hyperopia, the eyeball is shorter than normal or the cornea is less curved, causing light to focus behind the retina instead of directly on it. This results in blurred vision for close objects when you are young, and every distance when you are older.

<img class="img-reduced-width-centred" src="/api/images/3" alt="Normal eye and eye with hyperopia" width="1000">

## Causes of Hyperopia

Hyperopia can be caused by several factors, including:

1. **Eyeball shape**: When the eyeball is shorter than average, light rays entering the eye converge at a point beyond the retina.
2. **Cornea curvature**: If the cornea has a flatter-than-normal curvature, it can cause light to focus behind the retina.
3. **Lens**: The lens inside the eye may be too flat and lack optical power to properly focus light directly on the retina.

## Symptoms of Hyperopia

Individuals with hyperopia may experience the following symptoms:

1. **Blurred near vision**: Difficulty seeing objects up close, such as reading or working on a computer, which may lead to eyestrain.
2. **Altered distance vision**: Distant objects may appear clearer compared to nearby objects, but there can be fluctuations in quality, and as your lens ages, distance vision can be blurry as well.
3. **Eye strain and fatigue**: Prolonged focusing effort to compensate for hyperopia can cause discomfort, headaches, and tiredness.
4. **Squinting**: Some people with hyperopia may instinctively squint in an attempt to improve near vision.
5. **Eye turn (strabismus)**: Children with hyperopia may have to cross their eyes to maintain clear vision.
6. **Amblyopia**: Also known as lazy eye, amblyopia is a condition where the brain ignores the input from one eye that might be turned or out of focus, resulting in reduced vision in that eye.
7. **Avoidance of near work**: Children with hyperopia may avoid reading and other near tasks to avoid eye strain, impacting their learning.

## Diagnosis of Hyperopia

An optometrist can diagnose hyperopia during a comprehensive eye examination, which may include the following assessments:

1. **Retinoscopy**: An objective test that allows your optometrist to see how light is focussed by your eye.
2. **Refraction**: This determines the exact prescription needed to correct hyperopia.
3. **Cycloplegic Refraction**: By using eye drops to relax the focussing muscle, your optometrist can determine the true level of hyperopia if they suspect compensatory excessive subconscious focussing.

## Treatment Options for Hyperopia

Several treatment options are available to correct hyperopia and provide clear vision:

1. **Eyeglasses**: Prescription glasses and sunglasses with lenses that are convex (thicker in the middle) are commonly prescribed to correct hyperopia. These lenses help focus light directly onto the retina, improving vision and reducing strain.
2. **Contact lenses**: Soft or rigid gas permeable contact lenses can be used to correct hyperopia. They sit directly on the eye and provide clear vision by adjusting the way light is focused.
3. **Orthokeratology**: Also known as ortho-k or corneal reshaping therapy, this non-surgical approach involves wearing specially designed rigid gas permeable contact lenses overnight. The lenses reshape the cornea temporarily, allowing for improved vision during the day without the need for glasses or contact lenses.
4. **Refractive surgery**: Procedures such as LASIK and PRK can be considered for long-term correction of hyperopia. These surgeries reshape the cornea, allowing light to focus correctly on the retina.

The choice of treatment depends on factors such as the individual's age, lifestyle, overall eye health, and personal preferences. An optometrist can guide and recommend the most suitable treatment option.

### Managing Hyperopia

In addition to corrective measures, there are certain steps individuals with hyperopia can take to manage their condition and maintain good eye health:

1. **Regular eye exams**: Routine eye examinations are important to monitor changes in vision and overall eye health.
2. **Proper lighting**: Adequate lighting while reading or performing close-up tasks can reduce eye strain.
3. **Taking breaks**: Frequent breaks during near tasks, such as looking away and focusing on distant objects, can help reduce eye fatigue.
4. **Wearing prescribed corrective lenses**: Using the prescribed eyeglasses or contact lenses can greatly improve vision and reduce the symptoms of hyperopia. It is essential to wear the corrective lenses as advised by an optometrist.

Eye exercises: Some individuals with hyperopia may benefit from specific eye exercises recommended by their eye doctor or optometrist. These exercises can help strengthen the eye muscles and improve focus.

Maintaining a healthy lifestyle: Adopting a healthy lifestyle can promote good eye health. This includes eating a balanced diet rich in vitamins and minerals, staying hydrated, getting regular exercise, and avoiding smoking.

Protective eyewear: When engaging in activities that may pose a risk to the eyes, such as sports or working with hazardous materials, wearing appropriate protective eyewear can help prevent injuries and maintain eye health.

Being aware of symptoms: It is important to be aware of any changes in vision or new symptoms that may indicate a worsening of hyperopia. If such changes occur, it is advisable to consult an optometrist for further evaluation and appropriate management.

Overall, managing hyperopia involves a combination of corrective measures, lifestyle adjustments, and regular eye care. By following these recommendations and staying proactive in maintaining good eye health, individuals with hyperopia can minimize the impact of the condition on their daily lives and enjoy clear vision.

*Disclaimer: This guide provides general information and should not substitute professional medical advice. Please consult your eye care professional for personalized recommendations and guidance.*`,
      category_id: 2,
      html: "",
      administrator_id: 1,
    },
    {
      title: "Understanding Astigmatism",
      description:
        "An overview of astigmatism and its causes, symptoms, and treatment options.",
      markdown: `# Astigmatism: A Comprehensive Guide

Astigmatism is a common vision condition that can affect your ability to see clearly and to focus precisely. This guide aims to provide you with a comprehensive overview of astigmatism.

## Understanding Astigmatism

Astigmatism occurs when the cornea (the front surface of the eye) or the lens inside the eye has an non-spherical or irregular shape. Instead of having a smooth, spherical curvature, the cornea or lens may be shaped more like a football or the back of a spoon. This irregular shape causes light to focus on multiple points rather than a single point on the retina, resulting in blurred or distorted vision.

<img class="img-reduced-width-centred" src="/api/images/4" alt="Normal eye and eye with astigmatism" width="1000">

## Signs and Symptoms

If you have astigmatism, you may experience the following signs and symptoms:

- Blurred or distorted vision: Objects at any distances may appear fuzzy, with detail at some orientations being better or worse than others.
- Streaky or ghosted vision: Images may appear streaky or ghosted, especially at night.
- Difficulty seeing at night: Astigmatism can cause difficulty seeing at night, especially when driving.
- Difficulty seeing fine details: Astigmatism can make it difficult to see fine details, such as small print.
- Squinting: Squinting can help improve vision by decreasing the spread of blur inside the eye, allowing light to focus more clearly but more dimly.
- Double vision: Astigmatism can cause double vision that doesn't resolve when one eye is closed.
- Eye strain and fatigue: Constant squinting or straining to see clearly can lead to eye discomfort and tiredness.
- Headaches: Prolonged periods of focusing on objects can result in headaches, especially during activities that require visual concentration, such as reading or using a computer.

## Diagnosis and Professional Care

To diagnose astigmatism and receive proper care, it is important to visit an optometrist for a comprehensive eye examination. This examination may include:

- Visual acuity test: You will be asked to read letters from an eye chart to assess your vision.
- Keratometry: This test measures the curvature of the cornea using a special instrument called a keratometer.
- Corneal topography: This test uses a computerised instrument to create a detailed map of the cornea, allowing your optometrist to assess its shape and curvature.
- Retinoscopy: This test uses a light to determine the quality of your optics and an approximate prescription needed to correct your astigmatism.
- Refraction test: Different lenses will be used to determine the specific prescription needed to correct your astigmatism.

## Corrective Measures

Astigmatism can be corrected using different methods, including:

- Eyeglasses: Prescription glasses with special cylindrical lenses can compensate for the irregular shape of the cornea or lens, allowing light to focus properly on the retina and providing clear vision.
- Contact lenses: Similarly, contact lenses with cylindrical powers can correct astigmatism and offer an alternative to glasses. Your optometrist can help determine the best type of contact lenses for your specific needs.
- Specialty contact lenses: In some cases, specialty contact lenses may be required to correct astigmatism. These include rigid gas permeable lenses, hybrid lenses, and scleral lenses.
- Orthokeratology: Also known as ortho-k or corneal reshaping therapy, this non-surgical approach involves wearing specially designed rigid gas permeable contact lenses overnight. The lenses reshape the cornea temporarily, allowing for improved vision during the day without the need for glasses or contact lenses.
- Refractive surgery: In some cases, individuals with astigmatism may consider refractive surgery, such as LASIK or PRK. These procedures reshape the cornea to correct the irregularities causing astigmatism. It is important to consult with an optometrist to assess the suitability of these surgeries based on your individual circumstances.

## Regular Eye Examinations

To ensure effective management of your astigmatism, it is crucial to schedule regular eye examinations with your optometrist. They will monitor any changes in your vision and make necessary adjustments to your corrective measures, ensuring you maintain clear and comfortable vision.

## Lifestyle Tips

In addition to corrective measures, you can adopt certain practices to manage astigmatism and maintain good eye health:

- Proper lighting: Ensure adequate lighting while reading or performing close-up tasks to reduce eye strain.
- Taking breaks: Take frequent breaks during near tasks, such as looking away and focusing on distant objects, to help reduce eye fatigue.
- Protect your eyes: When engaging in activities that may pose a risk to your eyes, such as sports or working with hazardous materials, wear appropriate protective eyewear to prevent injuries and maintain eye health.
- Healthy habits: Adopting a healthy lifestyle, including eating a balanced diet, staying hydrated, getting regular exercise, and avoiding smoking, can promote good eye health.

Remember to consult with your optometrist for personalized recommendations and guidance based on your specific needs and circumstances.`,
      category_id: 2,
      html: "",
      administrator_id: 1,
    },
    {
      title: "Understanding Presbyopia",
      description:
        "An overview of presbyopia and its causes, symptoms, and treatment options.",
      category_id: 2,
      markdown: `# Presbyopia: A Comprehensive Guide

Presbyopia is a common age-related vision condition that affects the ability to focus on nearby objects. If you're experiencing difficulties with close-up vision as you age, understanding presbyopia and its management is important. This comprehensive guide aims to provide you with the necessary information about presbyopia.

## Understanding Presbyopia

Presbyopia occurs when the natural lens inside the eye loses its flexibility and ability to focus on nearby objects. It is a normal age-related change that typically becomes noticeable after the age of 40, but the process begins when you are a small child. As a result, individuals with presbyopia find it challenging to read small print, perform tasks at close distances, or see objects clearly in low-light conditions.

<img class="img-reduced-width-centred" src="/api/images/5" alt="Presbyopic eye with book, clear and blurry" width="1000">

## Signs and Symptoms

If you have presbyopia, you may experience the following signs and symptoms:

- Difficulty reading small print or seeing nearby objects clearly.
- Eyestrain and fatigue when performing close-up tasks.
- Headaches after reading or performing close-up tasks.
- Squinting to see clearly.
- The need to hold reading material at arm's length to see it clearly.
- The need to increase the brightness of lighting when reading or performing close-up tasks.
- Avoiding reading or performing close-up tasks.

## Diagnosis and Professional Care

To diagnose presbyopia and receive proper care, it is important to visit an optometrist for a comprehensive eye examination. This examination may include:

- Visual acuity test: You will be asked to read letters from an eye chart to assess your vision at various distances.
- Retinoscopy: This test uses a light to determine the quality of your optics and an approximate prescription needed to correct your presbyopia.
- Refraction test: Different lenses will be used to determine the specific prescription needed for clear near vision.
- A discussion about your lifestyle and visual needs: Your optometrist will ask you about your lifestyle and visual needs to determine the best corrective measures for you.

## Corrective Measures

Presbyopia can be managed through various corrective measures, including:

- Prescription eyeglasses: Depending on lifestyle and convenience needs, and if you have other refractive errors like nearsightedness, farsightedness, or astigmatism in addition to presbyopia, your optometrist may prescribe reading glasses, progressive lenses, extended focus near lenses, anti-fatigue lenses or bifocals.
- Multifocal Contact lenses: There are multifocal contact lenses available that can correct presbyopia. These lenses provide different powers in different zones, enabling clear vision at various distances. Your optometrist can help determine the best type of contact lenses for your specific needs.
- Monovision contact lenses: This approach involves wearing a contact lens with a prescription for near vision in one eye and a prescription for distance vision in the other eye. Your brain learns to adapt to this difference, allowing you to see clearly at various distances. Your optometrist can help determine the best type of contact lenses for your specific needs.
- Orthokeratology: Also known as ortho-k or corneal reshaping therapy, this non-surgical approach involves wearing specially designed rigid gas permeable contact lenses overnight. Combining multifocal effects and monovision, the lenses reshape the cornea temporarily, allowing for improved vision during the day without the need for glasses or contact lenses.
- Refractive surgery: Some individuals with presbyopia may consider refractive surgery options, such as monovision LASIK or refractive lens exchange. These procedures aim to correct presbyopia by adjusting the focus of each eye to optimize near and distance vision. It is crucial to consult with an optometrist to assess the suitability of these surgeries based on your individual circumstances.

## Regular Eye Examinations

To ensure optimal management of presbyopia, it is important to schedule regular eye examinations with your optometrist. They will monitor any changes in your vision and make necessary adjustments to your corrective measures, ensuring you maintain clear and comfortable near vision.

## Lifestyle Tips

In addition to corrective measures, you can adopt certain practices to manage presbyopia and maintain good eye health:

- Good lighting: Ensure proper lighting when reading or performing close-up tasks to reduce eyestrain.
- Adjusting reading distance: Find a comfortable distance that allows you to read or perform tasks without excessive strain.
- Taking breaks: Give your eyes periodic breaks during extended near tasks to prevent fatigue.
- Maintaining overall eye health: Follow a healthy lifestyle, including a balanced diet, staying hydrated, regular exercise, and avoiding smoking, to support good eye health.

*Disclaimer: This guide provides general information and should not substitute professional medical advice. Please consult your eye care professional for personalized recommendations and guidance.*`,
      html: "",
      administrator_id: 1,
    },
    {
      title: "Understanding Dry Eye",
      description:
        "An overview of dry eye and its causes, symptoms, and treatment options.",
      category_id: 1,
      markdown: `# Dry Eye: A Comprehensive Guide

Dry eye is a common condition that occurs when the eyes do not produce enough tears or when the tears evaporate too quickly. If you're experiencing dryness, irritation, or discomfort in your eyes, understanding dry eye and its management is essential. This comprehensive guide aims to provide you with the necessary information about dry eye.

## Understanding Dry Eye

<img class="img-reduced-width-centred" src="/api/images/6" alt="artistic eye with dry cracks" width="1000">

Dry eye occurs when the quantity or quality of tears is insufficient to keep the eyes adequately lubricated and nourished. This can result in a range of symptoms, including dryness, redness, stinging, burning, itchiness, and a feeling of grittiness in the eyes. In severe cases, it may lead to blurred vision and difficulty performing daily activities.

## Causes and Risk Factors

Several factors can contribute to the development of dry eye, including:

- Age: Dry eye becomes more common as you age, particularly after the age of 50.
- Gender: Women are more prone to dry eye due to hormonal changes caused by pregnancy, oral contraceptives, or menopause.
- Environmental factors: Dry or windy climates, air conditioning, smoke, and prolonged screen time can worsen dry eye symptoms.
- Medical conditions: Certain medical conditions, such as autoimmune disorders (e.g., Sjögren's syndrome), rosacea, diabetes, thyroid disorders, and allergies, can increase the risk of dry eye.
- Eye conditions: Dry eye can be associated with other eye conditions, such as blepharitis, meibomian gland dysfunction, and eyelid abnormalities.
- Eye surgery: Dry eye is a common side effect of refractive surgeries, such as LASIK and PRK.
- Medications: Some medications, including antihistamines, decongestants, antidepressants, and hormone replacement therapy, may contribute to dry eye symptoms.

## Diagnosis and Professional Care

To diagnose dry eye and receive proper care, it is important to visit an optometrist for a comprehensive eye examination. This examination may include:

- Evaluation of symptoms and medical history: Your optometrist will ask about your symptoms and any underlying health conditions.
- Eye examination: Your eyes will be examined to assess tear production, measure tear quality, and evaluate the overall health of the ocular surface.
- Additional tests: In some cases, additional tests may be performed to evaluate the tears, measure tear film stability, or assess the integrity of the ocular surface.

<img class="img-reduced-width-centred" src="/api/images/7" alt="Tear film layers" width="1000">

## Management and Treatment

Dry eye can be managed and treated through various approaches, including:

- Artificial tears: Over-the-counter artificial tears in the form of eye drops can provide temporary relief by supplementing natural tear production. Non-preserved are best.
- Prescription medications: In certain cases, your optometrist may prescribe medications, such as anti-inflammatory eye drops or medications that promote tear production.
- Eyelid hygiene: Keeping your eyelids clean can help prevent blockages in the oil glands, which can contribute to dry eye.
- Nutritional supplements: Certain nutritional supplements, such as omega-3 fatty acids, may help improve dry eye symptoms.
- Warm compresses: Applying a warm compress (40-42 degrees, 7+ minutes) to the eyes can help improve protective oil production and relieve dry eye symptoms.
- Environmental modifications: Making adjustments to your environment, such as using a humidifier, reducing screen time, avoiding smoke, and wearing wrap-around glasses in windy conditions, can help alleviate dry eye symptoms.
- Lifestyle adjustments: Implementing self-care practices, such as regular blinking exercises, maintaining good eyelid hygiene, and staying hydrated, can contribute to managing dry eye symptoms.
- Punctal plugs: Tiny silicone or gel plugs can be inserted into the tear ducts to block tear drainage, helping to keep the eyes moist.
- Advanced therapies: In severe or chronic cases, advanced therapies like autologous serum eye drops, amniotic membrane transplantation, or intense pulsed light therapy may be recommended.

## Regular Eye Examinations

To ensure optimal management of dry eye, it is important to schedule regular eye examinations with your optometrist. They will monitor your symptoms, assess the effectiveness of treatments, and make necessary adjustments to your management plan.

## Lifestyle Tips

In addition to professional care and treatments, you can adopt certain lifestyle practices to manage dry eye and promote better eye health:

- Follow the 20-20-20 rule: During prolonged screen use or near tasks, take a break every 20 minutes to look at an object 20 feet away for 20 seconds.
- Maintain a healthy diet: Ensure your diet includes foods rich in omega-3 fatty acids, such as fish, flaxseed, and chia seeds, which can contribute to better tear production.
- Stay hydrated: Drink an adequate amount of water throughout the day to support overall hydration, including tear production.

*Disclaimer: This guide provides general information and should not substitute professional medical advice. Please consult your eye care professional for personalized recommendations and guidance.*`,

      html: "",
      administrator_id: 1,
    },

    {
      title: "Eye Injury Prevention",
      description: "Overview of Eye Injury Prevention",
      category_id: 3,
      markdown: `# Eye Injury Prevention: A Comprehensive Guide

Eye injuries can have a significant impact on vision and overall eye health. Taking proactive measures to prevent eye injuries is crucial for maintaining good visual health. This comprehensive guide aims to provide you with the necessary information on eye injury prevention.

## Understanding Eye Injuries

Eye injuries can occur in various settings, such as at home, during sports activities, or in the workplace. They can range from minor irritations to severe trauma, potentially resulting in permanent vision loss. Common causes of eye injuries include flying objects, chemical exposure, sharp objects, and sports-related accidents.

## Protective Eyewear

Wearing appropriate protective eyewear is one of the most effective ways to prevent eye injuries. Here are some recommendations:

- Safety glasses: When engaging in activities that pose a risk of eye injury, such as construction work, yard work, or home repairs, always wear safety glasses or goggles. These should have lenses made of polycarbonate, which is impact-resistant and provides adequate protection.
- Sports goggles: If you participate in sports activities, particularly those involving high-speed projectiles or physical contact, wear sports goggles specifically designed for that sport. These goggles provide impact protection and can help prevent eye injuries.
- Sunglasses: When outdoors, protect your eyes from harmful ultraviolet (UV) radiation by wearing sunglasses that block 100% of UVA and UVB rays. Look for sunglasses labeled with UV protection.

<img class="img-reduced-width-centred" src="/api/images/8" alt="Safety Glasses" width="1000">

## Workplace Safety

If your occupation involves potential eye hazards, take these steps to ensure workplace eye safety:

- Follow safety protocols: Adhere to workplace safety guidelines and use appropriate protective eyewear as required by your employer.
- Proper training: Receive proper training on eye safety practices, including handling hazardous materials, operating machinery, and using protective equipment.
- Regular equipment maintenance: Ensure that machinery and tools in your workplace are properly maintained to minimize the risk of eye injuries.

## Home Safety

Eye injuries can also occur at home. To maintain a safe environment:

- Use caution with household chemicals: When handling chemicals such as cleaning products, solvents, or pesticides, always wear appropriate eye protection and follow safety instructions.
- Be mindful during DIY projects: When engaging in do-it-yourself projects involving tools or materials that could cause eye injury, wear safety glasses or goggles and work in a well-lit area.
- Childproofing: If you have children, childproof your home to minimize the risk of eye injuries. Store hazardous substances out of reach, secure cords and blinds, and educate children about the importance of eye safety.

## Emergency Preparedness

In the event of an eye injury, taking immediate action can prevent further damage. Be prepared:

- First aid knowledge: Learn basic first aid techniques for eye injuries, such as flushing the eye with clean water or saline solution in case of chemical exposure.
- Contact emergency services: If you or someone else experiences a severe eye injury, seek immediate medical attention by calling emergency services or visiting the nearest emergency room.

## Regular Eye Examinations

Regular eye examinations play a vital role in identifying potential eye health issues, including conditions that can increase the risk of injury. Schedule routine eye exams with your eye care professional to detect any underlying problems and receive appropriate guidance for eye injury prevention.

## Spreading Awareness

Educating others about eye injury prevention is crucial for creating a safer environment. Share your knowledge with family, friends, and colleagues, emphasizing the importance of protective eyewear and safe practices.

Remember, eye injury prevention is a proactive approach to safeguarding your vision. By following safety guidelines, using protective eyewear, and staying vigilant in various settings, you can significantly reduce the risk of eye injuries and promote good eye health.

*Disclaimer: This guide provides general information and should not substitute professional medical advice. Please consult your eye care professional for personalized recommendations and guidance.*`,
      html: "",
      administrator_id: 1,
    },

    {
      title: "Common Vision Problems in Children",
      description: "Overview of Vision Problems in Children",
      category_id: 4,
      markdown: `# Common Vision Problems in Children: A Comprehensive Guide

Vision plays a crucial role in a child's development and learning. Identifying and addressing common vision problems early is essential for optimal visual health. This comprehensive guide aims to provide you with an overview of common vision problems in children.

## Understanding Common Vision Problems

Several vision problems can affect children. Here are some of the most common ones:

1. **Refractive errors:** Refractive errors, such as nearsightedness (myopia), farsightedness (hyperopia), and astigmatism, occur when the shape of the eye prevents light from focusing properly on the retina, leading to blurry vision.

2. **Heterophoria and Convergence Difficulties:** Heterophoria refers to a misalignment of the eyes, where the eyes have to work harder to be aligned when looking at an object. Convergence difficulties occur when the eyes have difficulty turning inward to focus on a near object. It can cause symptoms such as eye strain, headaches, difficulty concentrating on near activities such as reading, and avoidance of activities that cause strain (such as reading).

3. **Focussing Problems:** Focusing problems occur when the eyes have difficulty maintaining clarity or in changing focus from distance to near and vice versa. It can cause symptoms such as eye strain, headaches, difficulty concentrating on near activities such as reading, and avoidance of activities that cause strain (such as reading).

4. **Tracking Problems:** Tracking problems occur when the eyes have difficulty moving smoothly across a line of text or following a moving object. It can cause symptoms such as missing words or lines when reading, and slow copying from the teacher's presentations.

5. **Amblyopia (lazy eye):** Amblyopia occurs when one eye has weaker vision than the other. It can result from a misalignment of the eyes (strabismus), unequal refractive errors, or other factors. If left untreated, amblyopia can lead to permanent vision loss in the weaker eye.

6. **Strabismus:** Strabismus is a misalignment of the eyes, where one or both eyes may turn inward (esotropia), outward (exotropia), upward, or downward. It can lead to problems with depth perception and can sometimes be associated with amblyopia.

7. **colour vision deficiency:** colour vision deficiency, commonly known as colour blindness, is the inability to perceive certain colours or distinguish between them. It is usually inherited and more common in males, with 1 in 15 males and 1 in 200 females having the condition.

<img class="img-reduced-width-centred" src="/api/images/14" alt="Ishihara colour vision test plates" width="1000">

## Signs and Symptoms

Detecting vision problems in children can be challenging, as they may not realise their vision is impaired. Watch for these signs:

- Frequent eye rubbing or blinking.
- Squinting, tilting the head, or covering one eye.
- Holding objects very close to the face or sitting too close to the television.
- Avoiding activities that require near or distance vision, such as reading or playing sports.
- Complaints of headaches, eye strain, or blurred vision.
- Difficulty concentrating or paying attention, or losing their place when reading or copying.

## Diagnosis and Professional Care

Early detection and diagnosis of vision problems in children are crucial. Regular eye examinations with an optometrist are recommended, including:

- Infant eye exams: A screening examination should occur at 6 months of age.
- Preschool-age: Children should have another eye examination between 3 and 4 years of age.
- School-age: Regular eye exams should occur every one to two years, or as recommended by the eye care professional.

## Treatment and Management

Treatment options for common vision problems in children may include:

- Eyeglasses, orthokeratology or contact lenses: Corrective lenses can help children with refractive errors achieve clear vision and prevent further visual issues.
- Vision therapy: Vision therapy involves a series of eye exercises and activities to improve visual skills, eye coordination, and focusing abilities.
- Patching or eye drops: In cases of amblyopia, the stronger eye may be temporarily patched or treated with eye drops to encourage the weaker eye to develop proper vision.
- Surgical intervention: Strabismus may require surgical correction to align the eyes.

<img class="img-reduced-width-centred" src="/api/images/9" alt="Girl with red-green glasses doing vision therapy" width="1000">

## Promoting Eye Health in Children

In addition to professional care, parents and caregivers can take proactive steps to promote good eye health in children:

- Encourage outdoor play: Spending time outdoors has been associated with a reduced risk of myopia progression in children.
- Limit screen time: Set screen time limits and encourage regular breaks to reduce eye strain.
- Provide a balanced diet: Ensure your child's diet includes foods rich in nutrients beneficial for eye health, such as fruits, vegetables, and omega-3 fatty acids.
- Emphasize eye safety: Teach your child about the importance of protecting their eyes during activities, such as wearing protective eyewear during sports or avoiding sharp objects near the eyes.

Remember, early detection and intervention are key to managing common vision problems in children effectively. Regular eye examinations and open communication with eye care professionals play a vital role in ensuring optimal visual health for your child.

*Disclaimer: This guide provides general information and should not substitute professional medical advice. Please consult your eye care professional for personalized recommendations and guidance.*`,
      html: "",
      administrator_id: 1,
    },
    {
      title: "Understanding Age-Related Macular Degeneration",
      description: "Overview of AMD",
      category_id: 5,
      markdown: `# Age-Related Macular Degeneration (AMD): A Comprehensive Guide

Age-related macular degeneration is a progressive eye condition that affects the macula, the central part of the retina responsible for sharp, central vision. Understanding AMD, its risk factors, and management is crucial for maintaining visual health. This comprehensive guide aims to provide you with an overview of age-related macular degeneration.

## Understanding Age-Related Macular Degeneration (AMD)

AMD is a common eye disease that primarily affects older individuals. It causes a gradual deterioration of the macula, leading to a loss of central vision. There are two main types of AMD:

1. **Dry AMD:** Dry AMD is the more common form, accounting for about 80-90% of cases. It occurs when the macula thins and small yellow deposits called drusen accumulate, causing a gradual loss of central vision.

2. **Wet AMD:** Wet AMD is less common but more severe. It occurs when abnormal blood vessels grow under the retina, leaking blood and fluid, which can lead to rapid and severe vision loss.

<img class="img-reduced-width-centred" src="/api/images/10" alt="Normal eye and eyes with macular degeneration" width="1000">

## Risk Factors

Several factors increase the risk of developing AMD, including:

- Age: AMD is more common in individuals aged 50 and older.
- Genetics: Family history of AMD can increase the likelihood of developing the condition.
- Smoking: Smoking significantly increases the risk of developing AMD.
- Race: AMD is more prevalent in Caucasians.
- Cardiovascular disease: Conditions like high blood pressure, high cholesterol, and obesity can contribute to AMD.

## Signs and Symptoms

<img class="img-reduced-width" src="/api/images/15" alt="Distorted vision with age-related macular degeneration" width="600">

Early stages of AMD may not exhibit noticeable symptoms. As the condition progresses, the following signs may become apparent:

- Blurred or distorted central vision.
- Difficulty reading or recognizing faces.
- Needing brighter light for close-up tasks.
- Decreased colour perception.
- Seeing straight lines as wavy or crooked.

## Diagnosis and Professional Care

Early detection and diagnosis of AMD are crucial for managing the condition effectively. Regular comprehensive eye examinations with an optometrist or ophthalmologist are recommended, including:

- Visual acuity test: Assessing your ability to see clearly at various distances.
- Comprehensive eye examination: Examining the retina and macula for signs of AMD are a routine part of an optometric eye examination.
- Optical coherence tomography (OCT): Producing detailed cross-sectional images of the retina to assess its thickness and identify any abnormalities.

Additional tests may be performed to confirm a diagnosis of AMD, including:

- Amsler grid: A grid of horizontal and vertical lines used to detect any distortion in your central vision.
- Fundus autofluorescence (FAF): Capturing images of the retina to detect any abnormalities in the pigment cells underneath the retina.
- Fluorescein angiography: Injecting a dye into the bloodstream to highlight any abnormal blood vessels in the retina.

## Treatment and Management

While there is currently no cure for AMD, several treatment options and management strategies can help slow its progression and manage symptoms:

- **Dry AMD management:** Eating a healthy diet rich in antioxidants, vitamins, and minerals, such as leafy greens and fish, may help slow the progression of dry AMD. Regular monitoring with your eye care professional is essential.
- **Wet AMD treatment:** Intravitreal injections of anti-vascular endothelial growth factor (anti-VEGF) medications are the primary treatment for wet AMD. These injections help suppress abnormal blood vessel growth and reduce leakage, stabilizing or improving vision in some cases.

There is a lot of promising research into new treatments for AMD, including light therapy, gene therapy, stem cell therapy, and retinal transplants. However, these treatments are still in the early stages of development and are not yet widely available.

## Lifestyle Adjustments

In addition to professional care, certain lifestyle adjustments can help manage AMD:

- Quit smoking: If you smoke, quitting can significantly reduce the progression and severity of AMD.
- Protect your eyes from UV rays: Wear sunglasses that block 100% of UVA and UVB rays when outdoors to reduce UV damage to the eyes.
- Maintain a healthy lifestyle: Follow a balanced diet, engage in regular exercise, manage cardiovascular risk factors, and maintain a healthy weight to support overall eye health.

## Support and Resources

Living with AMD can be challenging, but support and resources are available. Organizations such as the Macular Disease Foundation Australia provide information, resources, and support for individuals with AMD and their families.

Remember, early detection, regular eye examinations, and proactive management are crucial in optimizing visual health and managing age-related macular degeneration.

*Disclaimer: This guide provides general information and should not substitute professional medical advice. Please consult your eye care professional for personalized recommendations and guidance.*`,
      html: "",
      administrator_id: 1,
    },
    {
      title: "Understanding Eye Care Practitioners",
      description:
        "An overview of the different types of eye care practitioners",
      category_id: 6,
      markdown: `# Overview of Different Types of Eye Care Practitioners

When it comes to maintaining optimal eye health and vision, various types of eye care practitioners play important roles. Here's an overview of the different types:

## Optometrists

**Optometrists** are primary eye care providers who specialize in assessing, diagnosing, and managing a wide range of eye conditions and visual disorders. Consider them the GPs of eye care. They typically hold a Master's degree, a Doctor of Optometry degree or a Bachelor's degree, depending on where and when they were educated. They are licensed to perform comprehensive eye examinations, prescribe corrective lenses, diagnose common eye diseases, and provide non-surgical treatments.

<img class="img-reduced-width-centred" src="/api/images/11" alt="Optometrist with eye chart and trial frame" width="1000">

Optometrists can:

- Conduct eye examinations to assess visual acuity and determine the need for corrective lenses.
- Advise on appropriate corrective lenses, such as glasses and contact lenses based on your eyes and your visual needs.
- Prescribe and fit contact lenses, as well as provide guidance on lens care and maintenance.
- Diagnose and manage common eye conditions, such as refractive errors, dry eye, and conjunctivitis.
- Detect and manage eye diseases, such as glaucoma, cataracts, and macular degeneration.
- Prescribe medications for certain eye conditions.
- Remove foreign bodies from the eye.
- Provide pre- and post-operative care for certain eye surgeries.
- Collaborate with other healthcare professionals for comprehensive patient care.

## Ophthalmologists

**Ophthalmologists** are medical doctors who specialize in medicare eye care and eye surgery. They have completed medical school, followed by a residency and possibly a fellowship in ophthalmology.

Ophthalmologists can:

- Conduct comprehensive eye examinations, similar to optometrists.
- Diagnose and manage eye diseases and conditions.
- Perform eye surgeries, including cataract surgery, LASIK, and retinal surgeries.
- Prescribe medications for eye-related conditions.
- Provide specialized care for complex eye conditions and systemic diseases affecting the eyes.
- They typically specialise in a particular area of eye care, such as glaucoma, cataracts, or retinal diseases.
- They don't typically prescribe corrective lenses or perform routine eye examinations.

## Orthoptists

**Orthoptists** are eye care practitioners who work closely with ophthalmologists. They specialize in the diagnosis and management of eye movement disorders, binocular vision problems, and certain types of strabismus (eye misalignment). Orthoptists typically have a bachelor's or master's degree in orthoptics.

Orthoptists can:

- Assess and manage eye movement disorders, including tracking and coordination.
- Evaluate and treat binocular vision problems, such as amblyopia (lazy eye) and convergence insufficiency.
- Assist in the management of strabismus, often in collaboration with ophthalmologists and optometrists.

## Optical Dispensers/Opticians

**Optical dispensers**, once known as opticians, are professionals who work in optical dispensaries or eyewear retail settings. They specialize in assisting patients in selecting and fitting prescription eyeglasses, and other eyewear products. They may also perform minor repairs and adjustments to eyeglasses.

Optical dispensers/opticians can:

- Interpret and fill eyeglass prescriptions provided by optometrists or ophthalmologists.
- Help patients choose frames that suit their preferences, prescription and lens type and ensure proper fit.
- Take measurements, including pupillary distance, to ensure accurate lens positioning.
- Provide guidance on lens options, coatings, and lens materials.
- Adjust and repair eyeglasses to improve comfort and fit.

Remember, regular eye examinations and appropriate care from qualified eye care practitioners are crucial for maintaining good eye health and optimal vision.

Disclaimer: This guide provides general information and should not substitute professional medical advice. Please consult an eye care practitioner for personalized recommendations and guidance.`,
      html: "",
      administrator_id: 1,
    },
    {
      title: "Fun facts about the Eye and Vision",
      description: "Overview of the Eye and Vision",
      category_id: 7,
      markdown: `# Fun Facts about the Eye and Vision

The human eye is a fascinating organ, responsible for processing visual information and allowing us to see the world around us. They give us so much information about the world, even if they are prone to falling for optical illusions.

<img class="img-reduced-width-centred" src="/api/images/12" alt="Optical illusion where straight lines look curved" width="1000">

## Here are some fun facts about eyes and vision:

1. **The eye is the fastest muscle in the human body:** The muscles that control eye movement are the fastest muscles in the body, allowing the eyes to make rapid movements and track objects.

2. **Eyes are composed of over 2 million working parts:** The human eye is an intricate organ, consisting of over 2 million working parts that help process visual information.

3. **Your eyes don't grow much:** Your eyes are at two thirds of their adult size at birth.

4. **Your eyes can distinguish millions of colours:** The human eye can detect approximately 10 million different colours, thanks to specialized cells called cones in the retina.

5. **Eyes heal quickly:** Compared to other parts of the body, the eyes have a remarkable ability to heal rapidly. Minor scratches or injuries to the cornea often heal within 48 hours.

6. **Blinking keeps your eyes moisturized:** Blinking helps spread tears across the surface of the eye, keeping them moisturized and preventing dryness.

7. **Newborn babies see in black and white:** At birth, babies see the world in black and white because their colour vision is not fully developed yet.

8. **Eyes are the only part of the body where blood vessels can be seen without a microscope:** By looking at someone's eyes, healthcare professionals can observe the blood vessels in the retina, providing valuable information about overall health.

9. **Eyes are protected by tears:** Tears not only keep the eyes lubricated but also help protect against infections by washing away dirt and debris and killing bugs, and keep the eye at the right temperature.

10. **Each eye has a blind spot:** The optic nerve, which transmits visual information to the brain, creates a small blind spot in each eye. However, the brain compensates for it, so we rarely notice the blind spots in our daily lives.

11. **The centre of our vision is blind at night:** The centre of our vision is made up only of cone cells, which are not sensitive to low light. That's why we can't see well in the dark when we look straight ahead.

12. **Reading in dim light won't harm your eyes:** Contrary to the popular myth, reading in dim light may cause eye strain or temporary discomfort, but it does not cause permanent damage to your eyesight.

13. **Eyes are the second most complex organ after the brain:** The eyes are incredibly complex organs, second only to the brain in complexity. They work in tandem with the brain to process visual information and create our perception of the world.

14. **Eyes can indicate attraction:** Pupil dilation is associated with attraction and interest. When a person is attracted to someone or engaged in a stimulating conversation, their pupils can dilate.

15. **Blue eyes are not blue:** They only appear blue because of the way light is scattered off the iris structures back out of they eye, in exactly the same way that the sky is blue through 'Rayleigh scattering'.

<img class="img-reduced-width-centred" src="/api/images/13" alt="Closeup of a blue eye" width="1000">

Remember, these fun facts about the eye and vision can be great conversation starters, but it's important to rely on accurate information from eye care professionals for any health-related concerns or questions.

I hope you enjoy sharing these fun facts!`,
      html: "",
      administrator_id: 1,
    },
    {
      title: "Understanding Cataracts",
      description: "Overview of cataracts and what can be done about them",
      category_id: 1,
      markdown: `# Understanding Cataracts

## What are Cataracts?

A cataract is a clouding of the normally clear lens of your eye. For people who have cataracts, seeing through cloudy lenses is a bit like looking through a frosty or fogged-up window.

<img class="img-reduced-width-centred" src="/api/images/16" alt="Cataracts vs normal eye and vision" width="1000">

## Symptoms of Cataracts

- Blurred vision, double vision, or rapidly increasing shortsightedness.
- Sensitivity to light. Lights may seem too bright and/or present a glare.
- Changes in color perception especially a reduction to brightness of blue colours.
- Difficulty seeing at night.
- Frequent prescription changes in your eyewear.

## Causes of Cataracts

Cataracts are a normal part of the aging process. Cataracts develop when aging or injury changes the tissue that makes up your eye's lens. Some inherited genetic disorders that cause other health problems can increase your risk of cataracts. Some medications can increase your risk of cataracts. Cataracts can also be caused by other eye conditions, past eye surgery or medical conditions such as diabetes.

## Types of Cataracts

### Common types of cataracts include:

- **Nuclear Cataracts**: A nuclear cataract forms deep in the central zone (nucleus) of the lens. Nuclear cataracts usually are associated with aging.
- **Cortical Cataracts**: A cortical cataract is characterized by white, wedge-like opacities that start in the periphery of the lens and work their way to the center in a spoke-like fashion.
- **Posterior Sub-capsular Cataracts**: These types form at the back of the lens. They can interfere with your reading vision, reduce your vision in bright light, and cause glare or halos around lights at night.

Often people with have a combination of nuclear and cortical cataracts, which we call **mixed cataract**.

#### More rare types of cataracts include:

- **Congenital Cataracts**: Some babies are born with cataracts or develop them in childhood, often in both eyes. These cataracts may be so small that they do not affect vision. If they do, the lenses may need to be removed.
- **Traumatic Cataracts**: Cataracts can develop after an eye injury, sometimes years later.
- **Secondary Cataracts**: These develop as a result of other medical conditions, like diabetes, or exposure to toxic substances, certain drugs (such as corticosteroids or diuretics), ultraviolet light, or radiation.
- **Radiation Cataracts**: Cataracts can develop after exposure to some types of radiation.
- **Glassblower's Cataracts**: These form as a result of intense heat and infrared radiation.


## Risk Factors

Several factors increase your risk of developing cataracts, including:

- Older age - most people will develop cataracts in their 60s or 70s
- Diabetes
- Excessive exposure to sunlight/UV light
- Smoking
- Obesity
- High blood pressure
- Previous eye injury or inflammation
- Prolonged use of corticosteroid medications
- Drinking excessive amounts of alcohol

## Preventive Measures

Protecting yourself against UV from a young age is important, and protecting your eyes from trauma is too. A healthy diet and lifestyle can also help reduce your risk of developing cataracts but there is no specific dietary supplement that has been proven to prevent or slow down the progression of cataract.

## Treatment

The symptoms of early cataract may be improved with new eyeglasses, brighter lighting, anti-glare sunglasses, or magnifying lenses. If these measures do not help, surgery is the only effective treatment.

### Success Rate of Cataract Surgery

Cataract surgery is one of the most common operations performed. It is a highly successful procedure with an excellent success rate. It takes a skilled surgeon less than 15 minutes to perform the procedure, and it is usually bloodless, suture-less and it is usually done with simple local anaesthetic. Over 95% of cataract surgeries improve vision, according to the American Society of Cataract and Refractive Surgery (ASCRS). As with any surgical procedure, complications can occur, but they are relatively uncommon. Most complications can be treated successfully with medications or additional surgical procedures. Factors that can affect the success rate include the general health of the patient and the condition of the eye, apart from the cataract.

### Types of Artificial Lenses

Artificial lenses, known as intraocular lenses (IOLs), replace the eye's natural lens that is removed during cataract surgery. They are implanted inside the eye to help focus light onto the retina. There are several types of IOLs available:

- **Monofocal Lenses**: These lenses have one focal point and can be set to improve either distance or close vision, but not both.

- **Multifocal Lenses**: These lenses improve both near and distance vision and are similar to wearing multifocal eyeglasses.

- **Toric Lenses**: These are used for patients with astigmatism. They correct both the cataract and the astigmatism simultaneously.

- **Extended Depth of Focus (EDOF) Lenses**: These are a newer type of lens that provides a continuous range of vision for far, intermediate, and near distances.

Your optometrist and your eye surgeon will help you choose the type of lens that best suits your lifestyle and vision needs based on your specific circumstances and the health of your eyes.

## Conclusion

Regular eye examinations can help detect cataracts and other eye problems at their earliest stages. Ask your optometrist how often you should have an eye examination.

Disclaimer: This guide provides general information and should not substitute professional medical advice. Please consult an eye care practitioner for personalized recommendations and guidance.`,

      html: "",
      administrator_id: 1,
    },
    {
      title: "Diabetes and Eye Care",
      description: "Overview of recommended eye care for people with diabetes",
      category_id: 1,
      markdown: `# The Importance of Eye Care for People with Diabetes

## Introduction

Diabetes can have significant effects on the eyes, leading to conditions like diabetic retinopathy, glaucoma, and cataract. The Australian National Health and Medical Research Council (NHMRC) and Optometry Australia recommend regular eye examinations for people with diabetes to prevent vision loss and manage these conditions. 

## How Often Should Diabetic Patients Have Eye Examinations?

For adults with diabetes, Optometry Australia and the NHMRC recommend an eye examination at least once every two years. However, if you have a known eye condition or your diabetes is not well-controlled, more frequent eye examinations may be necessary, potentially as often as every three to six months. Your optometrist will advise you on how often you should have an eye examination.

Children with type 1 diabetes should have an initial eye examination within five years after diagnosis, while children with type 2 diabetes should have an eye examination at the time of diagnosis. 

## Why Regular Eye Examinations are Important for People with Diabetes

<img class="img-reduced-width-centred" src="/api/images/17" alt="Diabetic retinopathy" width="1000">

Regular eye examinations are important for people with diabetes because high blood sugar levels can damage the small blood vessels in the retina, leading to diabetic retinopathy. This condition can cause vision loss if not detected and treated early. 

Eye examinations can also detect other eye conditions that are more common in people with diabetes, such as glaucoma and cataracts. Early detection and management of these conditions can help to prevent vision loss.

## What Optometrists Look For 

<img class="img-reduced-width-centred" src="/api/images/18" alt="Retinal examination with a slitlamp" width="1000">

During an eye examination, optometrists look for signs of diabetic retinopathy, including changes to the blood vessels in the retina, the growth of new blood vessels, and retinal swelling. They also check for cataracts, which are more common in people with diabetes, and for signs of glaucoma, which can occur when diabetes affects the blood flow to the optic nerve.

Optometrists may use a variety of tests during the examination, including visual acuity testing, dilated eye examinations, tonometry (to check for glaucoma), and optical coherence tomography (to check the thickness of the retina). 

## Consequences of Not Having Regular Eye Examinations

Failure to have regular eye examinations when you have diabetes can lead to serious consequences. Diabetic retinopathy can progress without symptoms until it reaches an advanced stage where the risk of vision loss is high. Similarly, glaucoma and cataracts can develop slowly and without causing symptoms until they are quite advanced. 

By having regular eye examinations, these conditions can be detected and managed early, greatly reducing the risk of vision loss.

## Conclusion 

Regular eye examinations are a crucial part of managing diabetes. By detecting and treating eye conditions early, optometrists can help to prevent vision loss in people with diabetes. 

Please remember to schedule your regular eye examinations and to manage your diabetes as effectively as possible in consultation with your healthcare team. If you notice any changes to your vision, seek medical attention immediately.`,
      html: "",
      administrator_id: 1,
    },
  ];

  for (let i = 0; i < templates.length; i++) {
    try {
      await Template.create(templates[i]);
      console.log(`Template ${i + 1} created.`);
    } catch (error) {
      console.error(`Template ${i + 1} could not be created.`);
      console.error(error);
    }
  }

  console.log("Template seeding completed.");
}

module.exports = seedTemplates;
