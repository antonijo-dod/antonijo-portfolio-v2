"use client";

import { motion } from "framer-motion";
import { email } from "@/lib/config";

const Contact = () => (
  <motion.section
    id="contact"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
    className="max-w-[600px] mx-auto mb-[100px] text-center"
  >
    <h2 className="numbered-heading">What&apos;s Next?</h2>

    <h2 className="text-[clamp(40px,5vw,60px)] m-0">Get In Touch</h2>

    <p className="mt-5">I&apos;m currently looking for new opportunities.</p>

    <a href={`mailto:${email}`} className="btn mt-[50px]">
      Say Hello
    </a>
  </motion.section>
);

export default Contact;
