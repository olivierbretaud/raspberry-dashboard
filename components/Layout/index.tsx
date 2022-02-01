import styles from './Layout.module.scss';

export default function Layout({ children }: { children : React.ReactNode }) {
  return (
    <>
      <div><h1>control panel</h1></div>
      <main className={styles.main}>{children}</main>
    </>
  );
}
