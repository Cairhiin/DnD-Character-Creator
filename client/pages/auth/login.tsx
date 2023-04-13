import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/auth/Auth.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { getProviders, getSession, signIn } from 'next-auth/react';
import { Roboto_Condensed } from 'next/font/google';

type FormData = {
    password: string;
    username: string;
};

const roboto = Roboto_Condensed({
    subsets: ['latin'],
    weight: ['400', '700']
});

const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
}).required();

export default function Login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({resolver: yupResolver(schema)});
    const onSubmit = (data: FormData) => {
        signIn("credentials", {
            username: data.username,
            password: data.password
        });
    };
  
    return (
        <>
            <Head>
                <title>D&D Character Creator | Login</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.main}>
                <div className={styles.auth}>
                    <h2 className={styles.header}>Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <div className={styles.form__image__login}>

                        </div>
                        <div className={styles.form__content}>
                            <div className={styles.form__data}>
                                <div className={styles.form__row}>
                                    <label className={styles.form__label}>Username</label>
                                    <input {...register("username")} className={styles.form__input}></input>
                                </div>
                                <p>{errors.username?.message}</p>
                                <div className={styles.form__row}>
                                    <label className={styles.form__label}>Password</label>
                                    <input type="password" {...register("password")} className={styles.form__input}></input>
                                </div>
                                <p>{errors.password?.message}</p>
                            </div>
                            <div className={styles.form__buttons}>
                                <button type="submit" className={`${styles.btn} ${styles.primary} ${roboto.className}`}>
                                    Login
                                </button>
                                <p>Don't have an account yet? <Link href="/auth/register">Register</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context: any) {
    const { req } = context;
    const session = await getSession({ req });
    const providers = await getProviders()

    if (session) {
        return {
            redirect: { destination: '/' }
        };
    }

    return {
        props: {
            providers
        }
    }
}