// "use client"
// import React, { useContext, useState } from 'react'
// import FormSection from '../_components/FormSection'
// import OutputSection from '../_components/OutputSection'
// import { TEMPLATE } from '../../_components/TemplateListSection'
// import Templates from '@/app/(data)/Templates'
// import { Button } from '@/components/ui/button'
// import { ArrowLeft } from 'lucide-react'
// import Link from 'next/link'
// import { chatSession } from '@/utils/AiModal'
// import { db } from '@/utils/db'
// import { AIOutput } from '@/utils/schema'

// import moment from 'moment'
// import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
// import { useRouter } from 'next/navigation'
// import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext'
// import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext'
// import { useUser } from '@clerk/nextjs'

// interface PROPS{
//     params:{
//         'template-slug':string
//     }
// }

// function CreateNewContent(props: PROPS) {
//     const selectedTemplate: TEMPLATE | undefined = Templates?.find((item) => item.slug == props.params['template-slug']);
//     const [loading, setLoading] = useState(false);
//     const [aiOutput, setAiOutput] = useState<string>('');
//     const { user } = useUser();
//     const router = useRouter();
//     const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
//     const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
//     const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);

//     // Function to remove RTF tags (formatted content) and get plain text code
//     const cleanRtfOutput = (rtf: string): string => {
//         // Regular expression to remove all RTF tags (and any extra formatting)
//         const rtfStripper = /\\[a-z]+\d*|{\*?[^{}]*}|\\[^a-z]|[{}]/g;
//         let cleanText = rtf.replace(rtfStripper, '').trim();

//         // Optionally, you can also strip excess line breaks or spaces if needed
//         cleanText = cleanText.replace(/\n+/g, '\n').trim();

//         return cleanText;
//     };

//     // Function to generate AI content
//     const GenerateAIContent = async (formData: any) => {
//         if (totalUsage >= 100000000 && !userSubscription) {
//             console.log("Please Upgrade");
//             router.push('/dashboard/billing');
//             return;
//         }
//         setLoading(true);
//         const SelectedPrompt = selectedTemplate?.aiPrompt;
//         const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;
//         const result = await chatSession.sendMessage(FinalAIPrompt);
//         console.log(result)

//         let rawOutput = result?.response.text(); // AI-generated output (could be RTF)
//         let cleanOutput = '';

//         if (rawOutput) {
//             // Clean RTF output and retain only the plain text or code
//             cleanOutput = cleanRtfOutput(rawOutput);
//         }

//         setAiOutput(cleanOutput); // Set the cleaned output
//         await SaveInDb(JSON.stringify(formData), selectedTemplate?.slug, cleanOutput);
//         setLoading(false);

//         setUpdateCreditUsage(Date.now());
//     };

//     // Function to save data in the database
//     const SaveInDb = async (formData: any, slug: any, aiResp: string) => {
//         const result = await db.insert(AIOutput).values({
//             formData: formData,
//             templateSlug: slug,
//             aiResponse: aiResp,
//             createdBy: user?.primaryEmailAddress?.emailAddress,
//             createdAt: moment().format('DD/MM/yyyy'),
//         });

//         console.log(result);
//     };

//     return (
//         <div className='p-5'>
//             <Link href={"/dashboard"}>
//                 <Button> <ArrowLeft /> Back</Button>
//             </Link>
//             <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5 '>
//                 {/* FormSection */}
//                 <FormSection
//                     selectedTemplate={selectedTemplate}
//                     userFormInput={(v: any) => GenerateAIContent(v)}
//                     loading={loading} />
//                 {/* OutputSection */}
//                 <div className='col-span-2'>
//                     <OutputSection aiOutput={aiOutput} />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CreateNewContent;
"use client";
import React, { useContext, useState } from 'react';
import FormSection from '../_components/FormSection';
import OutputSection from '../_components/OutputSection';
import { TEMPLATE } from '../../_components/TemplateListSection';
import Templates from '@/app/(data)/Templates';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { chatSession } from '@/utils/AiModal';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';

import moment from 'moment';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { useRouter } from 'next/navigation';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';
import { useUser } from '@clerk/nextjs';

interface PROPS {
    params: {
        'template-slug': string;
    };
}

function CreateNewContent(props: PROPS) {
    const selectedTemplate: TEMPLATE | undefined = Templates?.find(
        (item) => item.slug == props.params['template-slug']
    );
    const [loading, setLoading] = useState(false);
    const [aiOutput, setAiOutput] = useState<string>('');
    const { user } = useUser();
    const router = useRouter();
    const { totalUsage } = useContext(TotalUsageContext);
    const { userSubscription } = useContext(UserSubscriptionContext);
    const { setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);

    // Function to clean RTF content
    const cleanRtfOutput = (rtf: string): string => {
        const rtfStripper = /\\[a-z]+\d*|{\*?[^{}]*}|\\[^a-z]|[{}]/g;
        let cleanText = rtf.replace(rtfStripper, '').trim();
        cleanText = cleanText.replace(/\n+/g, '\n').trim();
        return cleanText;
    };

    // Function to format HTML content
    const formatHtmlOutput = (html: string): string => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        // Return the cleaned and formatted inner HTML
        return doc.body.innerHTML || '';
    };
    
    // Updated GenerateAIContent function
    const GenerateAIContent = async (formData: any) => {
        if (totalUsage >= 100000000 && !userSubscription) {
            console.log('Please Upgrade');
            router.push('/dashboard/billing');
            return;
        }
    
        setLoading(true);
        const SelectedPrompt = selectedTemplate?.aiPrompt;
        const FinalAIPrompt = JSON.stringify(formData) + ', ' + SelectedPrompt;
        const result = await chatSession.sendMessage(FinalAIPrompt);
        console.log(result);
    
        let rawOutput = result?.response.text();
        let formattedOutput = '';
    
        if (rawOutput) {
            if (/<\/?[a-z][\s\S]*>/i.test(rawOutput)) {
                // Handle and clean HTML content
                formattedOutput = formatHtmlOutput(rawOutput);
            } else {
                // Treat other output as plain text
                formattedOutput = rawOutput.trim();
            }
        }
    
        setAiOutput(formattedOutput);
        await SaveInDb(JSON.stringify(formData), selectedTemplate?.slug, formattedOutput);
        setLoading(false);
    
        setUpdateCreditUsage(Date.now());
    };

    

    // Function to save data in the database
    const SaveInDb = async (formData: any, slug: any, aiResp: string) => {
        const result = await db.insert(AIOutput).values({
            formData: formData,
            templateSlug: slug,
            aiResponse: aiResp,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD/MM/yyyy'),
        });

        console.log(result);
    };

    return (
        <div className="p-5">
            <Link href={'/dashboard'}>
                <Button>
                    <ArrowLeft /> Back
                </Button>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
                {/* FormSection */}
                <FormSection
                    selectedTemplate={selectedTemplate}
                    userFormInput={(v: any) => GenerateAIContent(v)}
                    loading={loading}
                />
                {/* OutputSection */}
                <div className="col-span-2">
                    <OutputSection aiOutput={aiOutput} />
                </div>
            </div>
        </div>
    );
}

export default CreateNewContent;
