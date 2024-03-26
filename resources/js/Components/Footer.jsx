import { useEffect } from "react";
import styles from "../../css/footer.module.css";
import { Link } from "@inertiajs/react";
export default function Footer() {
    const body = document.body;
    useEffect(() => {
        const adjustFooterPosition = () => {
            const footer = document.querySelector(`.${styles.sitefooter}`);

            if (
                body.offsetHeight < window.innerHeight ||
                body.offsetHeight === window.innerHeight
            ) {
                footer.style.position = "fixed";
                footer.style.bottom = 0;
                footer.style.right = 0;
                footer.style.left = 0;
            } else {
                footer.style.position = "relative";
                footer.style.bottom = "";
                footer.style.right = "";
                footer.style.left = "";
            }
        };

        window.addEventListener("resize", adjustFooterPosition);
        adjustFooterPosition();

        return () => {
            window.removeEventListener("resize", adjustFooterPosition);
        };
    }, [body.offsetHeight]);

    return (
        <footer className={`${styles.sitefooter}`}>
            <div className={`${styles.container}`}>
                <div className={`${styles.row}`}>
                    <div className={styles.Made}>
                        <h6>Made by</h6>
                        <ul className={styles.footerlinks}>
                            <li>
                                <a
                                    target="_blank"
                                    href="https://www.linkedin.com/in/abde-rrahmane-662607254/"
                                >
                                    Drissi Abderrhamane
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    href="https://www.linkedin.com/in/mouad-moudene-8b824821b/"
                                >
                                    Moudene Mouad
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    href="https://ma.linkedin.com/in/kaf-abdssamad-311a38246/"
                                >
                                    KAF Abdessamad
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className={` ${styles.small}`} />
            </div>
            <div className={`${styles.container}`}>
                <Link href="/About">About</Link>
                <div className={` ${styles.row}`}>
                    <div>
                        <p className={styles.copyrightText}>
                            Copyright © 2024 All Rights Reserved by
                            <a href="http://www.one.org.ma/">
                                <span className={styles.logo}> ONEE</span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
