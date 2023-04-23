import { withTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import PreviewProfile from "@/components/ui/PreviewProfile";
import { useAuth } from "@/components/context/AuthContext";
import schema from "@/utils/validationSchemaProfile";
import { doc, collection, getFirestore } from "firebase/firestore";
import "firebase/auth";
import "firebase/firestore";
import updateDocument from "@/firebase/updateSubCollection";
import updateDocumentField from "@/firebase/updateData";
import PageIntro from "@/components/PageIntro";

function EditProfile({ t }) {
    const [formData, setFormData] = useState({});
    const { user } = useAuth();
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // await schema.validate(formData, { abortEarly: false });
            const db = getFirestore();
            const userId = user.uid;
            const parentDocRef = doc(db, "users", userId);
            const childCollectionRef = collection(
                parentDocRef,
                "Personal_data"
            );
            const childCollectionPath = childCollectionRef.path; // outputs "parentCollection/parentDocId/childCollection"
            const data = {
                Fullname: formData.fullName,
                deleted: false,
                hobbies: formData.hubbies,
                familySize: formData.familySize,
                education_level: formData.educationLevel,
                phoneNumber: formData.phoneNumber,
                gender: formData.gender,
            };
            const userData = {
                date_brith: formData.birthDate,
            };

            const profile = "profile";
            await updateDocument(childCollectionPath, profile, data);
            await updateDocument("users", userId, userData);
            const router = require("next/router").default;
            router.push({
                pathname: "/",
            });
        } catch (error) {
            if (error.inner) {
                const newErrors = {};
                error.inner.forEach((e) => {
                    newErrors[e.path] = e.message;
                });
                setFormErrors(newErrors);
            }
        }
    };
    return (
        <div className='container '>
            <div className='grid grid-cols-1 lg:grid-cols-2 py-20 gap-y-10'>
                <div className='justify-self-center lg:justify-self-start'>
                    <PreviewProfile />
                </div>
                <div className='w-full justify-self-center lg:justify-self-end'>
                    <PageIntro title={t("profileInfo")} />
                    <form
                        className='  mt-[8px]  w-full'
                        onSubmit={handleSubmit}
                    >
                        <div className='flex items-center my-5'>
                            <Input
                                inputWidthSize='flex-[2_1_0%]'
                                type='text'
                                name='fullName'
                                label={t("fullName")}
                                labelColor='text-black'
                                value={formData.fullName || ""}
                                onChange={handleChange}
                                error={formErrors.fullName}
                                t={t}
                                field={t("fullName")}
                            />
                        </div>
                        <div className='flex items-center my-5'>
                            <Dropdown
                                name='educationLevel'
                                placeholder='select'
                                data={[
                                    { value: "select", label: t("select") },
                                    { value: "bacholar", label: t("bacholar") },
                                    { value: "master", label: t("master") },
                                    { value: "PhD", label: t("PhD") },
                                    { value: "deploma", label: t("deploma") },
                                ]}
                                label={t("educationLevel")}
                                labelColor='text-black'
                                value={formData.educationLevel}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        educationLevel: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className='flex items-center my-5'>
                            <Input
                                inputWidthSize='flex-[2_1_0%]'
                                type='text'
                                name='hubbies'
                                label={t("hubbies")}
                                labelColor='text-black'
                                value={formData.hubbies || ""}
                                onChange={handleChange}
                                error={formErrors.hubbies}
                                t={t}
                                field={t("hubbies")}
                            />
                        </div>
                        <div className='flex items-center my-5'>
                            <Input
                                inputWidthSize='flex-[1_1_0%]'
                                type='number'
                                name='familySize'
                                label={t("familySize")}
                                labelColor='text-black'
                                value={formData.familySize || ""}
                                onChange={handleChange}
                                error={formErrors.familySize}
                                t={t}
                                field={t("familySize")}
                            />

                            <div className='ms-10 flex-[0_1_0%]'>
                                {t("member(s)")}
                            </div>
                        </div>
                        <div className='flex items-center my-5'>
                            <Dropdown
                                className='lg:w-8/12 text-light-black'
                                placeholder='select '
                                name='gender'
                                label={t("gender")}
                                labelColor='text-black'
                                data={[
                                    { value: "select", label: t("select") },
                                    { value: "female", label: t("female") },
                                    { value: "male", label: t("male") },
                                ]}
                                value={formData.gender}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        gender: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className='flex items-center my-5'>
                            <Input
                                inputWidthSize='flex-[2_1_0%]'
                                type='date'
                                name='birthDate'
                                label={t("birthDate")}
                                labelColor='text-black'
                                value={formData.birthDate || ""}
                                onChange={handleChange}
                                error={formErrors.birthDate}
                                t={t}
                                field={t("birthDate")}
                            />
                        </div>
                        <div className='flex items-center my-5'>
                            <Input
                                inputWidthSize='flex-[2_1_0%]'
                                type='email'
                                name='email'
                                label={t("email")}
                                labelColor='text-black'
                                value={user.email || ""}
                                onChange={handleChange}
                                error={formErrors.email}
                                t={t}
                                field={t("email")}
                            />
                        </div>
                        <div className='flex items-center my-5'>
                            <Input
                                inputWidthSize='flex-[2_1_0%]'
                                type='text'
                                name='phoneNumber'
                                label={t("phoneNumber")}
                                labelColor='text-black'
                                value={formData.phoneNumber || ""}
                                onChange={handleChange}
                                error={formErrors.phoneNumber}
                                t={t}
                                field={t("phoneNumber")}
                            />
                        </div>
                        <div className='flex items-center my-5'>
                            <Input
                                inputWidthSize='flex-[2_1_0%]'
                                type='file'
                                name='uploadId'
                                label={t("uploadId")}
                                labelColor='text-black'
                                value=''
                                onChange={handleChange}
                                error={formErrors.uploadId}
                                t={t}
                                field={t("uploadId")}
                            />
                        </div>

                        <PageIntro title={t("security")} />
                        <div className='flex items-center my-5'>
                            <Input
                                inputWidthSize='flex-[2_1_0%]'
                                type='password'
                                name='currentPassword'
                                label={t("currentPassword")}
                                labelColor='text-black'
                                value={formData.currentPassword || ""}
                                onChange={handleChange}
                                error={formErrors.currentPassword}
                                t={t}
                                field={t("currentPassword")}
                            />
                        </div>
                        <div className='flex items-center my-5'>
                            <Input
                                inputWidthSize='flex-[2_1_0%]'
                                type='password'
                                name='newPassword'
                                label={t("newPassword")}
                                labelColor='text-black'
                                value={formData.newPassword || ""}
                                onChange={handleChange}
                                error={formErrors.newPassword}
                                t={t}
                                field={t("newPassword")}
                            />
                        </div>

                        <div className='flex flex-col sm:flex-row gap-2 my-8'>
                            <Button
                                content={t("saveChanges")}
                                filled='true'
                                size='medium'
                                radius='md'
                                textTransform='uppercase'
                                shadow='shadow-lg'
                                onClick={handleSubmit}
                            />
                            <Button
                                content={t("deleteAccount")}
                                filled='true'
                                size='medium'
                                radius='md'
                                textTransform='uppercase'
                                shadow='shadow-lg'
                            />
                            <Button
                                content={t("cancel")}
                                filled='true'
                                size='medium'
                                radius='md'
                                textTransform='uppercase'
                                shadow='shadow-lg'
                            />
                        </div>
                    </form>

                    <PageIntro title={t("paymentMethods&Tickets")} />
                    <div className='flex gap-10'>
                        <div className='flex flex-col gap-5'>
                            <p>{t("cardsAdded", { count: 3 })}</p>
                            <Button
                                content={t("showCards")}
                                filled='true'
                                size='medium'
                                radius='md'
                                textTransform='uppercase'
                                shadow='shadow-lg'
                            />
                        </div>
                        <div className='flex flex-col gap-5'>
                            <p>{t("ticketsRemaining", { count: 10 })}</p>
                            <Button
                                content={t("buyTickets")}
                                filled='true'
                                size='medium'
                                radius='md'
                                textTransform='uppercase'
                                shadow='shadow-lg'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
                "profile",
                "validation",
            ])),
        },
    };
}
export default withTranslation(["profile", "validation"])(EditProfile);
