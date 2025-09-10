"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, Paperclip } from "lucide-react";
import {
  useGetLoanMessagesQuery,
  useSendLoanMessageMutation,
} from "@/redux/services/loanchatApi";
import { uploadFile, getFileUrl } from "@/utils/fileUploadService";

interface LoanChatModalProps {
  loanId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function LoanChatModal({
  loanId,
  isOpen,
  onClose,
}: LoanChatModalProps) {
  const [message, setMessage] = useState("");
  const [attachmentType, setAttachmentType] = useState<"text" | "photo" | "document">("text");
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);

  const { data, isLoading, refetch } = useGetLoanMessagesQuery(
    { loanId, page: 1, limit: 100 },
    { skip: !isOpen }
  );
  const [sendMessage, { isLoading: isSending }] = useSendLoanMessageMutation();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll when new messages appear
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data?.messages, isOpen]);

  const handleSend = async () => {
    if (!message.trim() && !attachmentFile) return;

    let uploadedFiles: string[] = [];
    if (attachmentFile) {
      try {
        const result = await uploadFile(attachmentFile);
        uploadedFiles.push(result.filename);
      } catch (err) {
        console.error("File upload failed:", err);
        return;
      }
    }

    await sendMessage({
      loanId,
      message: message || (attachmentFile ? "Sent an attachment" : ""),
      type: attachmentType,
      attachments: uploadedFiles,
    });

    setMessage("");
    setAttachmentFile(null);
    setAttachmentType("text");
    refetch();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center text-black justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-[6px_6px_0_0_#000] border-2 border-black flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-[#FFD439] rounded-t-xl border-b-2 border-black">
          <h3 className="font-semibold text-lg text-black">Loan Chat</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black hover:text-white rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {isLoading ? (
            <p className="text-gray-500">Loading messages...</p>
          ) : data?.messages?.length ? (
            data.messages.map((msg: any, idx: number) => (
              <div
                key={idx}
                className={`flex ${
                  msg.senderRole === "USER" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm max-w-[75%] ${
                    msg.senderRole === "USER"
                      ? "bg-gray-100 text-black border border-gray-300"
                      : "bg-[#ffb700] text-black border border-black shadow-[2px_2px_0_0_#000]"
                  }`}
                >
                  {/* Text */}
                  {msg.message && <p>{msg.message}</p>}

                  {/* Attachments */}
                  {msg.attachments?.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {msg.attachments.map((file: string, i: number) => (
                        <AttachmentPreview key={i} fileKey={file} />
                      ))}
                    </div>
                  )}

                  {/* Timestamp */}
                  <span className="block mt-1 text-[10px] opacity-70">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No messages yet</p>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t-2 border-black p-3 flex gap-2 items-center bg-gray-50">
          {/* Attachment type dropdown */}
          <select
            value={attachmentType}
            onChange={(e) =>
              setAttachmentType(e.target.value as "text" | "photo" | "document")
            }
            className="border-2 border-gray-300 rounded px-2 py-1 text-sm hover:border-[#FFD439] focus:border-[#FFD439] focus:outline-none"
          >
            <option value="text">Text</option>
            <option value="photo">Photo</option>
            <option value="document">Document</option>
          </select>

          {/* File input if not text */}
          {attachmentType !== "text" && (
            <label className="cursor-pointer flex items-center gap-1 text-sm bg-[#FFD439] hover:bg-[#ffb700] px-2 py-1 rounded border-2 border-black hover:shadow-[2px_2px_0_0_#000] transition-all duration-200">
              <Paperclip className="w-4 h-4" />
              {attachmentFile ? attachmentFile.name : "Attach File"}
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  setAttachmentFile(e.target.files ? e.target.files[0] : null)
                }
              />
            </label>
          )}

          {/* Text input */}
          {attachmentType === "text" && (
            <input
              type="text"
              className="flex-1 border-2 border-gray-300 rounded-lg px-3 py-2 text-sm hover:border-[#FFD439] focus:border-[#FFD439] focus:outline-none"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
          )}

          {/* Send */}
          <button
            onClick={handleSend}
            disabled={isSending}
            className="bg-[#FFD439] hover:bg-[#ffb700] text-black px-4 py-2 rounded-lg flex items-center gap-1 border-2 border-black shadow-[2px_2px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function AttachmentPreview({ fileKey }: { fileKey: string }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const fetchedUrl = await getFileUrl(fileKey);
        setUrl(fetchedUrl);
      } catch (err) {
        console.error("Error fetching file URL:", err);
      }
    })();
  }, [fileKey]);

  if (!url) return <p className="text-xs italic text-gray-400">Loading file…</p>;

  if (/\.(jpg|jpeg|png|gif)$/i.test(fileKey)) {
    return (
      <img
        src={url}
        alt="attachment"
        className="w-32 h-32 object-cover rounded-lg border"
      />
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="text-xs underline text-[#ffb700] hover:text-black transition-colors duration-200"
    >
      {fileKey}
    </a>
  );
}
