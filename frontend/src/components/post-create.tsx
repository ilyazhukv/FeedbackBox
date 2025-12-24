import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import { useState } from "react";

import api from "../../api/api";

interface FormData {
  title: string;
  description: string;
  type: string;
}

interface MetaData {
  value: string;
  label: string;
}

interface PostCreateProps {
  meta: MetaData[];
}

export default function PostCreate({ meta }: PostCreateProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    type: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    try {
      api.post("/posts", formData);
      setFormData({ title: "", description: "", type: "" });
      onOpenChange();
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
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                New Post
              </ModalHeader>
              <ModalBody>
                <Select
                  isRequired
                  className="max-w-xs"
                  label="Type"
                  placeholder="Select a type"
                  name="type"
                  onChange={handleChange}
                >
                  {meta.map((item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  ))}
                </Select>
                <Input
                  isRequired
                  label="Title"
                  placeholder="Enter title"
                  variant="bordered"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={120}
                  description={`${formData.title.length}/120`}
                />
                <Textarea
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
                  onClick={handleSubmit}
                  isDisabled={!formData.title.trim()}
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