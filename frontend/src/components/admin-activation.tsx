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

import { HeartFilledIcon } from "@/components/icons";
import React, { useState } from "react";
import api from "../../service/api.js";

interface formData {
  name: string;
  password: string;
}

export default function AdminActivation() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState<formData>({
    name: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (formData.password.length < 8)
      return alert("The password must be longer than 8 characters.");

    try {
      const response = await api.post("/admin/login", formData);
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        window.location.reload();
        alert("Admin rights obtained for an hour")
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <Button
        className="text-sm font-normal text-default-600 bg-default-100"
        endContent={<HeartFilledIcon className="text-danger" />}
        variant="flat"
        color="primary"
        onPress={onOpen}
      >
        Admin Only
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  variant="bordered"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={
                    formData.password.length > 0 && formData.password.length < 8
                  }
                  errorMessage={
                    "The password must be longer than 8 characters."
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={handleSubmit}
                >
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
