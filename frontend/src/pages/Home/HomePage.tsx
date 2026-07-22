import { useState } from 'react';
import toast from 'react-hot-toast';
import ProductCard from './ProductCard/ProductCard';

import {
  Button,
  Card,
  FormField,
  Input,
  Modal,
} from '@/components/ui';

function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <FormField label="Search">
        <Input placeholder="Search..." />
      </FormField>

      <div className="mt-4 flex gap-3">
        <Button
          onClick={() => toast.success('Success')}
        >
          Toast
        </Button>

        <Button
          variant="secondary" 
          onClick={() => setOpen(true)}
        >
          Open Modal
        </Button>

       
      </div>

      <Modal
        open={open}
        title="Shop Sphere"
        onClose={() => setOpen(false)}
      >
        <p>This is a reusable modal11.</p>
         <ProductCard name='rahul' price={100}  />
        <ProductCard
          name="iPhone 16"
          price={89999}
        />

        <ProductCard
          name="MacBook Pro"
          price={199999}
        />
      </Modal>
    </Card>
  );
}

export default HomePage;