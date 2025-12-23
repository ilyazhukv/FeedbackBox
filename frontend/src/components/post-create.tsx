import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";
import { useState } from "react";

import api from "../../service/api";

interface formData {
  title: string;
  description: string;
}

export default function PostModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState<formData>({
    title: "",
    description: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    try {
      api.post("/posts", formData);
      setFormData({ title: "", description: "" });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        New Post
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Post
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Title"
                  placeholder="Enter title"
                  variant="bordered"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={120}
                  description={`${formData.title.length}/120`}
                />
                <Input
                  label="Description"
                  placeholder="Enter description"
                  variant="bordered"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={1200}
                  description={`${formData.description.length}/1200`}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={handleSubmit}
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
