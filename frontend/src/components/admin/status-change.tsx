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
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState<FormData>({ status: "" });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setFormData({ status: value });
  };

  const mutation = useMutation({
    mutationFn: (updateData: FormData) =>
      api.put(`/posts/update/${id}`, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      window.location.reload();
      onOpenChange();
    },
    onError: (err) => {
      console.error("Update error:", err);
    },
  });

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
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.confirm("Opdate status?")) {
                      mutation.mutate(formData);
                    }
                  }}
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
