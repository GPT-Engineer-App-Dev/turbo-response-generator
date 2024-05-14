import { useState } from 'react';
import { Container, VStack, Textarea, Button, Text, Box } from '@chakra-ui/react';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    const apiKey = 'YOUR_API_KEY_HERE'; // Placeholder for the actual API key
    const data = {
      prompt: prompt,
      max_tokens: 150
    };

    try {
      const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from OpenAI');
      }

      const result = await response.json();
      setResponse(result.choices[0].text);
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('Error fetching response. Please try again.');
    }
  };

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" mb={4}>GPT-3.5 Turbo</Text>
        <Textarea
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={handleInputChange}
          size="lg"
        />
        <Button colorScheme="blue" onClick={handleSubmit}>Submit</Button>
        <Box bg="gray.100" p={4} width="100%" mt={4}>
          <Text fontSize="md">Response:</Text>
          <Text mt={2}>{response}</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;