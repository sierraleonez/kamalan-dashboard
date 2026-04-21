<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #e0e0e0;
            border-top: none;
        }
        .product-box {
            background: #f9f9f9;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin: 20px 0;
        }
        .product-name {
            font-size: 18px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 8px;
        }
        .greeting-box {
            background: #fff9e6;
            border-left: 4px solid #f0ad4e;
            padding: 15px;
            margin: 20px 0;
            font-style: italic;
        }
        .footer {
            background: #f5f5f5;
            padding: 20px;
            text-align: center;
            border-radius: 0 0 8px 8px;
            font-size: 14px;
            color: #666;
        }
        .button {
            display: inline-block;
            padding: 12px 30px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
        .label {
            font-weight: bold;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎁 Gift Reserved!</h1>
    </div>
    
    <div class="content">
        <p>Hi {{ $reservation->registry->user->name ?? 'there' }},</p>
        
        <p>Great news! Someone has reserved a gift from your registry <strong>{{ $reservation->registry->name }}</strong>.</p>
        
        <div class="product-box">
            <div class="product-name">{{ $giftCartItem->product->name }}</div>
            <p style="margin: 5px 0;">
                <span class="label">Quantity:</span> {{ $giftCartItem->quantity }}
            </p>
            <p style="margin: 5px 0;">
                <span class="label">Reserved by:</span> {{ $reservation->display_name }}
            </p>
        </div>
        
        @if($reservation->greeting)
        <div class="greeting-box">
            <p style="margin: 0;"><strong>💌 Message from {{ $reservation->display_name }}:</strong></p>
            <p style="margin: 10px 0 0 0;">{{ $reservation->greeting }}</p>
        </div>
        @endif
        
        <p>This means someone is planning to give you this gift for your special occasion. How exciting! 🎉</p>
        
        <div style="text-align: center;">
            <a href="{{ url('/registry/' . $reservation->registry->magic_link) }}" class="button">
                View Your Registry
            </a>
        </div>
    </div>
    
    <div class="footer">
        <p>You're receiving this email because someone reserved a gift from your Kamalan registry.</p>
        <p>&copy; {{ date('Y') }} Kamalan. All rights reserved.</p>
    </div>
</body>
</html>
