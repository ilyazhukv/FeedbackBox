import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
} from "@heroui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../../api/api.ts";

interface FormData {
  status: string;
}

interface MetaData {
  value: string;
  label: string;
}

interface PostUpdateProps {
  meta: MetaData[];
}

export default function StatusChange({ meta }: PostUpdateProps) {
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState<FormData>({ status: "" });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setFormData({ status: value });
  };

  const handleSubmit = async () => {
    try {
      await api.put(`/posts/update/${id}`, formData);
      setFormData({ status: "" });
      onOpenChange();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Set Status
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Status</ModalHeader>
              <ModalBody>
                <Select
                  className="max-w-xs"
                  label="Status"
                  placeholder="Select a status"
                  selectedKeys={formData.status ? [formData.status] : []}
                  onChange={handleChange}
                >
                  {meta.map((item) => (
                    <SelectItem key={item.value}>{item.label}</SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={handleSubmit}
                  isDisabled={!formData.status}
                >
                  Set
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
