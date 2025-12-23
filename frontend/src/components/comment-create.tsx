import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@heroui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../service/api";

interface FormData {
  content: string;
}

export default function CommentCreate() {
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState<FormData>({ content: "" });

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = event.target;

    setFormData({ content: value });
  };

  const handleSubmit = async () => {
    try {
      await api.post(`/comments/${id}`, formData);
      setFormData({ content: "" });
      onOpenChange();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        New Comment
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Comment
              </ModalHeader>
              <ModalBody>
                <Textarea
                  label="Content"
                  placeholder="Enter text"
                  variant="bordered"
                  value={formData.content}
                  onChange={handleChange}
                  maxLength={3600}
                  description={`${formData.content.length}/3600`}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={handleSubmit}
                  isDisabled={!formData.content.trim()}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}