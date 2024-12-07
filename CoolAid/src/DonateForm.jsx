import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function DonateForm() {
  return (
    <div className='form-body'>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Donation Item</Form.Label>
                <Form.Select aria-label="Aid type">
                    <option>Select Aid Type</option>
                    <option value="1">Bottled Water</option>
                    <option value="2">Fan</option>
                    <option value="3">Air Conditioned Shelter</option>
                    <option value="3">Other</option>
                </Form.Select>
                <Form.Control type="text" placeholder="Custom item" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Amount/Capacity</Form.Label>
                <Form.Control type="number" min="1" placeholder="Enter amount" />
            </Form.Group>

        </Form>
    </div>
  );
}
