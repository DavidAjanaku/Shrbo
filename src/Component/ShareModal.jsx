import React, { useState } from "react";
import Modal from "react-modal";
import {
  RiMailSendLine,
  RiMessage2Line,
  RiWhatsappLine,
  RiMessengerLine,
  RiTwitterXLine,
  RiFacebookCircleLine,
  RiClipboardFill,
  RiMailSendFill,
  RiMessage2Fill,
  RiWhatsappFill,
  RiMessengerFill,
  RiTwitterXFill,
  RiFacebookCircleFill
} from "react-icons/ri";

const ShareModal = ({ isOpen, onClose, title, imageUrl }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleShare = (option) => {
    const url = window.location.href;
    const message = `${title} - ${url}`;

    switch (option) {
      case "Copy Link":
        navigator.clipboard.writeText(message).then(() => {
          alert("URL copied to clipboard");
          console.log('URL copied to clipboard');
        }).catch(err => {
          console.error('Could not copy text: ', err);
        });
        break;
      case "Email":
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(message)}`;
        break;
      case "Messages":
        window.location.href = `sms:?&body=${encodeURIComponent(message)}`;
        break;
      case "WhatsApp":
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}&attachment=${encodeURIComponent(imageUrl)}`);
        break;
      case "Messenger":
        window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&attachment=${encodeURIComponent(imageUrl)}`);
        break;
      case "Twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(imageUrl)}`);
        break;
      case "Facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}&attachments=${encodeURIComponent(imageUrl)}`);
        break;
      default:
        break;
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={{ content: { width: "300px", height: "600px", zIndex: "99999", margin: "auto" } }}>
      <div className="p-2">
        <h2 className="text-2xl mb-2">Share this experience</h2>
        <img src={imageUrl} className=" rounded-md h-36 w-full object-cover" alt="houseImage" />
        <h2 className="text-orange-400 mt-4">{title}</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li className="flex items-center gap-2 py-2 border-[1px] rounded-md my-3 px-4 cursor-pointer" onClick={() => handleShare("Copy Link")}><RiClipboardFill /> Copy Link</li>
          <li className="flex items-center gap-2 py-2 border-[1px] rounded-md my-3 px-4 cursor-pointer" onClick={() => handleShare("Email")}><RiMailSendFill /> Email</li>
          <li className="flex items-center gap-2 py-2 border-[1px] rounded-md my-3 px-4 cursor-pointer" onClick={() => handleShare("Messages")}><RiMessage2Fill /> Messages</li>
          <li className="flex items-center gap-2 py-2 border-[1px] rounded-md my-3 px-4 cursor-pointer" onClick={() => handleShare("WhatsApp")}><RiWhatsappFill /> WhatsApp</li>
          <li className="flex items-center gap-2 py-2 border-[1px] rounded-md my-3 px-4 cursor-pointer" onClick={() => handleShare("Messenger")}><RiMessengerFill /> Messenger</li>
          <li className="flex items-center gap-2 py-2 border-[1px] rounded-md my-3 px-4 cursor-pointer" onClick={() => handleShare("Twitter")}><RiTwitterXFill /> Twitter</li>
          <li className="flex items-center gap-2 py-2 border-[1px] rounded-md my-3 px-4 cursor-pointer" onClick={() => handleShare("Facebook")}><RiFacebookCircleFill /> Facebook</li>
        </ul>
      </div>
    </Modal>
  );
};

export default ShareModal;