"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, Paperclip, Download } from "lucide-react";
import {
  useGetLoanMessagesQuery,
  useSendLoanMessageMutation,
  useMarkLoanMessagesReadMutation,
} from "@/redux/services/loanchatApi";
import { uploadFile, getFileUrl } from "@/utils/fileUploadService";
import { useSession } from "next-auth/react";

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
  const [attachmentType, setAttachmentType] = useState<
    "text" | "photo" | "document"
  >("text");
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);

  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  const { data, isLoading, refetch } = useGetLoanMessagesQuery(
    { loanId, page: 1, limit: 100 },
    { skip: !isOpen }
  );
  const [sendMessage, { isLoading: isSending }] = useSendLoanMessageMutation();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [markLoanRead] = useMarkLoanMessagesReadMutation();

  const handleMarkMessagesRead = async () => {
    try {
      await markLoanRead({ loanId }).unwrap();
    } catch (err) {
      console.error("Failed to mark messages as read", err);
    }
  };

  // Auto scroll when new messages appear
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      handleMarkMessagesRead();
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
            className="p-2 hover:bg-black hover:text-white rounded-full transition-colors duration-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <p className="text-gray-500">Loading messages...</p>
          ) : data?.messages?.length ? (
            data.messages.map((msg: any, idx: number) => {
              const isMe = msg.senderId
                ? msg.senderId._id === currentUserId
                : false;
              return (
                <div
                  key={idx}
                  className={`flex items-end gap-2 ${
                    isMe ? "justify-end" : "justify-start"
                  }`}>
                  {/* Avatar (initials) */}
                  {!isMe && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
                      {msg.senderName
                        ? msg.senderName.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                  )}

                  {/* Message bubble */}
                  <div
                    className={`px-3 py-2 rounded-lg text-sm max-w-[70%] border ${
                      isMe
                        ? "bg-[#FFD439] text-black border-black shadow-[2px_2px_0_0_#000]"
                        : "bg-gray-100 text-black border-gray-300"
                    }`}>
                    {/* Sender name */}
                    {!isMe && (
                      <p className="text-xs font-semibold mb-1 text-gray-700">
                        {msg.senderName || msg.senderRole || "User"}
                      </p>
                    )}

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
                    <span className="block mt-1 text-[10px] opacity-70 text-right">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </span>
                  </div>

                  {/* Avatar for me */}
                  {isMe && (
                    <div className="w-8 h-8 rounded-full bg-[#FFD439] flex items-center justify-center text-xs font-bold border border-black">
                      Me
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-400">No messages yet</p>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t-2 border-black rounded-b-xl p-3 flex gap-2 items-center bg-gray-50">
          {/* Attachment type dropdown */}
          <select
            value={attachmentType}
            onChange={(e) =>
              setAttachmentType(e.target.value as "text" | "photo" | "document")
            }
            className="border-2 border-gray-300 rounded px-2 py-1 text-sm hover:border-[#FFD439] focus:border-[#FFD439] focus:outline-none">
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
            className="bg-[#FFD439] hover:bg-[#ffb700] text-black px-4 py-2 rounded-lg flex items-center gap-1 border-2 border-black shadow-[2px_2px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

const handleDownload = async (
  url: string,
  filename: string,
  setDownloading: (state: boolean) => void,
  setError: (err: string | null) => void
) => {
  try {
    setDownloading(true);
    setError(null);

    const res = await fetch(url);
    if (!res.ok) throw new Error("Network response was not ok");
    const blob = await res.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err: any) {
    console.error("Download failed:", err);
    setError(err.message || "Download failed");
  } finally {
    setDownloading(false);
  }
};

function AttachmentPreview({ fileKey }: { fileKey: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(true);

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

  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(fileKey);
  const isPdf = /\.pdf$/i.test(fileKey);

  if (!url)
    return <p className="text-xs italic text-gray-400">Loading file…</p>;

  return (
    <>
      {/* --- Small preview inside chat --- */}
      <div className="flex flex-col items-start gap-1">
        {isImage && (
          <img
            src={url}
            alt="attachment"
            onClick={() => setOpen(true)}
            className="w-32 h-32 object-cover rounded-lg border cursor-pointer hover:opacity-80"
          />
        )}

        {isPdf && (
          <div
            onClick={() => setOpen(true)}
            className="w-32 h-32 flex items-center justify-center border rounded-lg bg-gray-100 cursor-pointer hover:bg-gray-200 text-xs text-black">
            📄 View PDF
          </div>
        )}

        {/* --- Download button --- */}
        <button
          onClick={() => handleDownload(url, fileKey, setDownloading, setDownloadError)}
          disabled={downloading}
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-black underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
          <Download className="w-3 h-3" />
          {downloading ? "Downloading..." : "Download"}
        </button>

        {downloadError && (
          <p className="text-xs text-red-500">{downloadError}</p>
        )}
      </div>

      {/* --- Fullscreen modal --- */}
      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full h-[85vh] relative p-2 flex flex-col">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 bg-black text-white rounded-full p-2 hover:bg-gray-800">
              <X className="w-5 h-5" />
            </button>

            {/* Loading spinner */}
            {loadingPreview && (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Loading preview...</p>
              </div>
            )}

            {/* Large preview */}
            {isImage && (
              <img
                src={url}
                alt="full"
                onLoad={() => setLoadingPreview(false)}
                className={`w-full h-full object-contain rounded-lg ${
                  loadingPreview ? "hidden" : "block"
                }`}
              />
            )}

            {isPdf && (
              <iframe
                src={url}
                onLoad={() => setLoadingPreview(false)}
                className={`w-full h-full rounded-lg ${loadingPreview ? "hidden" : "block"}`}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
